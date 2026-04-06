from rest_framework import serializers
from .models import ChatSession, Message

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['sender', 'content', 'timestamp', 'citations']

class ChatSessionSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = ChatSession
        fields = ['id', 'title', 'created_at', 'messages']