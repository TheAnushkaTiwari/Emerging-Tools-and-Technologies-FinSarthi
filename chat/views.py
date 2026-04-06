import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
from rest_framework.permissions import IsAuthenticated
from .models import ChatSession, Message
from .serializers import ChatSessionSerializer, MessageSerializer
from rest_framework.generics import ListAPIView, RetrieveAPIView
from django.core.exceptions import PermissionDenied

load_dotenv()

class ChatAPIView(APIView):
    def post(self, request):
        # getting the user's message
        user_message = request.data.get('message')
        session_id = request.data.get('session_id')
        if not user_message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if session_id:
                session = ChatSession.objects.get(id=session_id, user=request.user)
            else:
                session = ChatSession.objects.create(user=request.user, title=user_message[:30])

            history_objs = Message.objects.filter(session=session).order_by('-timestamp')[:6]
            chat_history = ""
            for msg in reversed(history_objs):
                sender_label = "User" if msg.sender == 'user' else "FinSarthi"
                chat_history += f"{sender_label}: {msg.content}\n"
            # loading the Vector DB (Memory)
            embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
            faiss_index_path = os.path.join(settings.BASE_DIR, 'faiss_index')
            
            # checking if index exists
            if not os.path.exists(faiss_index_path):
                 return Response({"error": "Knowledge base not found. Did you run ingest_docs?"}, status=500)

            vectorstore = FAISS.load_local(
                faiss_index_path, 
                embeddings, 
                allow_dangerous_deserialization=True # Required for local files
            )

            # seting up the LLM(Brain)
            llm = ChatGroq(
                temperature=0, 
                model_name="llama-3.1-8b-instant", 
                groq_api_key=os.getenv("GROQ_API_KEY")
            )

            # create the Prompt Template (The "Persona")
            template = """
            You are FinSarthi, an expert financial advisor for Indian regulations.
            Use the chat history and the following pieces of context to answer the question at the end.
            If the answer is not in the context, say "I don't have enough information in my documents to answer that."
            Do not make up answers.

            RECOGNITION RULES:
            1. Use the "Chat History" below to remember the user's name, previous questions, and preferences.
            2. If the user asks "who am I" or "do you remember me", look specifically at the Chat History.
            3. Use the "Context" (PDF documents) only to answer technical financial questions.
            
            Chat History: {chat_history}
            
            Context: {context}
            
            Question: {question}
            
            Answer:"""
            
            QA_CHAIN_PROMPT = PromptTemplate(
                input_variables=["chat_history", "context", "question"], # Add this explicitly
                template=template
            )

            # building the RAG Chain
            qa_chain = ConversationalRetrievalChain.from_llm(
                llm=llm,
                retriever=vectorstore.as_retriever(
                    search_type="mmr",
                    search_kwargs={"k": 10, "fetch_k": 20}
                ),
                return_source_documents=True
            )

            # generating the Answer
            result = qa_chain.invoke({
                "question": user_message,
                "chat_history": [(msg.sender, msg.content) for msg in history_objs]
            })
            answer = result["answer"]
            
            sources = sorted(set(
                    f"Page {doc.metadata.get('page', '?')}"
                    for doc in docs
                )) if (docs := result.get("source_documents")) else []
            Message.objects.create(
                session=session, 
                sender='user', 
                content=user_message
            )
            Message.objects.create(
                session=session, 
                sender='ai', 
                content=answer, 
                citations=sources
            )
            return Response({
                "answer": answer,
                "sources": sources,
                "session_id": session.id
            })

        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
class ChatHistoryListView(ListAPIView):
    """Provides a list of all past sessions for the Sidebar"""
    permission_classes = [IsAuthenticated]
    serializer_class = ChatSessionSerializer

    def get_queryset(self):
        # Only show sessions belonging to the logged-in user
        return ChatSession.objects.filter(user=self.request.user).order_by('-created_at')

class ChatSessionDetailView(RetrieveAPIView):
    """Retrieves full message history for a specific session when clicked"""
    permission_classes = [IsAuthenticated]
    queryset = ChatSession.objects.all()
    serializer_class = ChatSessionSerializer

    def get_object(self):
        obj = super().get_object()
        # Security check: Ensure the session belongs to the user
        if obj.user != self.request.user:
            raise PermissionDenied("You do not have access to this conversation.")
        return obj