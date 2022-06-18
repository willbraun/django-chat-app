from django.urls import path, include
from .views import RoomListCreateAPIView, MessageListCreateAPIView, MessageDetailAPIView

app_name = 'rooms'

urlpatterns = [
    path('<int:room>/messages/<int:pk>/', MessageDetailAPIView.as_view()),
    path('<int:room>/messages/', MessageListCreateAPIView.as_view()),
    path('', RoomListCreateAPIView.as_view()),
]
