from django.urls import path, include

app_name = 'api'

urlpatterns = [
    path('rooms/', include('rooms.urls', namespace='rooms')),
    # path('messages/', include('messages.urls', namespace='messages'))
]
