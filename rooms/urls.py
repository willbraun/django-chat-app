from django.urls import path
from .views import RoomListCreateAPIView

app_name = 'rooms'

urlpatterns = [
    path('', RoomListCreateAPIView.as_view()),
]
