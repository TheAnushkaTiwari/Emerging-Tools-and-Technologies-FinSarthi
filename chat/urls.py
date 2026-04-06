from django.urls import path
from .views import ChatAPIView, ChatHistoryListView, ChatSessionDetailView

urlpatterns = [
    path('', ChatAPIView.as_view(), name='chat'),

    path('history/', ChatHistoryListView.as_view(), name='chat-history'),

    path('session/<int:pk>/', ChatSessionDetailView.as_view(), name='chat-session'),
]