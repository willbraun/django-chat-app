from django.db import models
from .models import Room
from django.conf import settings

# Create your models here.

class Chatmessage(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    body = models.TextField()
    created_timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.creator}, {self.body[:50]}, {self.created_timestamp}"