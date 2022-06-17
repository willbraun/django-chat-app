from rest_framework import generics

from .models import Chatmessage
from .serializers import ChatmessageSerializer

class ChatmessageListCreateAPIView(generics.ListCreateAPIView):
    queryset = Chatmessage.objects.all()
    serializer_class = ChatmessageSerializer
