from django.db import models
from django.contrib.auth.models import User

class ChatSession(models.Model):
    """Stores the container for a conversation"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_sessions')
    title = models.CharField(max_length=100, default="New Conversation")
    created_at = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    """Stores individual messages within a session"""
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=10, choices=[('user', 'User'), ('ai', 'FinSarthi')])
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    # For RAG: We store sources here to prove to your teacher we aren't hallucinating
    citations = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.sender}: {self.content[:30]}..."