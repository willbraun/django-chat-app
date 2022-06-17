from django.urls import path
from .views import ChatmessageListCreateAPIView

app_name = 'messages'

urlpatterns = [
    path('', ChatmessageListCreateAPIView.as_view()),
]