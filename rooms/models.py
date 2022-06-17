from django.db import models
from django.conf import settings


class Room(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    body = models.TextField()
    created_timestamp_UTC = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.creator}, {self.body[:50]}, {self.created_timestamp_UTC}"