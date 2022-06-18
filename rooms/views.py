from rest_framework import generics

from .models import Room, Message
from .serializers import RoomSerializer, MessageSerializer


class RoomListCreateAPIView(generics.ListCreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class MessageListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        room = self.kwargs['room']
        return Message.objects.filter(room=room)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class MessageDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer