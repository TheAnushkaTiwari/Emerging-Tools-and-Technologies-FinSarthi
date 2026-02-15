from django.urls import path
from .views import ChatAPIView

urlpatterns = [
    path('ask/', ChatAPIView.as_view(), name='chat-ask'),
]