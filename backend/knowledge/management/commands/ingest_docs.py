import os
from django.core.management.base import BaseCommand
from django.conf import settings
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS

class Command(BaseCommand):
    help = 'Ingest PDFs from the data folder into the FAISS vector database'

    def handle(self, *args, **kwargs):
        #defining paths
        data_folder = os.path.join(settings.BASE_DIR, 'data')
        faiss_index_path = os.path.join(settings.BASE_DIR, 'faiss_index')

        #checking if data folder exists
        if not os.path.exists(data_folder):
            self.stdout.write(self.style.ERROR(f"Data folder not found at: {data_folder}"))
            return

        # load documents
        documents = []
        self.stdout.write("Scanning for PDFs...")
        
        if not os.path.exists(data_folder):
             os.makedirs(data_folder)

        files = [f for f in os.listdir(data_folder) if f.endswith('.pdf')]
        
        if not files:
            self.stdout.write(self.style.WARNING("No PDF files found in 'data' folder."))
            return

        for filename in files:
            file_path = os.path.join(data_folder, filename)
            self.stdout.write(f"Loading: {filename}")
            try:
                loader = PyPDFLoader(file_path)
                documents.extend(loader.load())
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error loading {filename}: {e}"))

        # split text(chunking)
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        final_documents = text_splitter.split_documents(documents)
        self.stdout.write(f"Split documents into {len(final_documents)} chunks.")

        # create embeddings & Store in FAISS
        self.stdout.write("Generating Embeddings (this will download a model the first time)...")
        
        embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
        
        # creating the Vector Store
        vectorstore = FAISS.from_documents(final_documents, embeddings)

        # saving to Disk
        vectorstore.save_local(faiss_index_path)
        self.stdout.write(self.style.SUCCESS(f"Successfully saved FAISS index to {faiss_index_path}"))