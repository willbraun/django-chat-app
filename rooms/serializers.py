from rest_framework import serializers
from .models import Room, Message


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class MessageSerializer(serializers.ModelSerializer):
    creator = serializers.SlugRelatedField(
        many = False,
        read_only = True,
        slug_field = 'username',
    )
    
    class Meta:
        model = Message
        fields = ('id','creator','body','created_timestamp_UTC',)