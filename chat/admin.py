from django.contrib import admin
from .models import ChatSession, Message

# making the Chat tables visible in the Admin
admin.site.register(ChatSession)
admin.site.register(Message)
