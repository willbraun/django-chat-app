from rest_framework import serializers
from .models import Chatmessage

class ChatmessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chatmessage
        fields = '__all__'