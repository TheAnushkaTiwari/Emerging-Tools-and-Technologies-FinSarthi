import os
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

class ChatAPIView(APIView):
    def post(self, request):
        # getting the user's message
        user_message = request.data.get('message')
        if not user_message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
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
            Use the following pieces of context to answer the question at the end.
            If the answer is not in the context, say "I don't have enough information in my documents to answer that."
            Do not make up answers.
            
            Context: {context}
            
            Question: {question}
            
            Answer:"""
            
            QA_CHAIN_PROMPT = PromptTemplate.from_template(template)

            # building the RAG Chain
            qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                chain_type="stuff",
                retriever=vectorstore.as_retriever(search_kwargs={"k": 3}), # Top 3 chunks
                return_source_documents=True,
                chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
            )

            # generating the Answer
            result = qa_chain.invoke({"query": user_message})
            answer = result["result"]
            
            # extracting Sources (To show where the info came from)
            sources = []
            for doc in result["source_documents"]:
                sources.append(f"Page {doc.metadata.get('page', '?')}")

            return Response({
                "answer": answer,
                "sources": list(set(sources)) # Unique pages
            })

        except Exception as e:
            print(f"Error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
