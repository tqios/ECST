from django.urls import path, include
from .views import *
from rest_framework import routers


urlpatterns = [
    path('join/', Join.as_view()),
    # path('login/', Login.as_view()),
    # path('logout/', LogOut.as_view()),
    # path('profile/upload', UploadProfile.as_view())
    # path('todo/<int:pk>/', TodoDetail.as_view(), name='todo-detail'),
]