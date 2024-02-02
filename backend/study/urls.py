from django.urls import path, include
from .views import StudyList
from rest_framework import routers


urlpatterns = [
    path('study/', StudyList.as_view(), name='todo-list'),
    # path('todo/<int:pk>/', TodoDetail.as_view(), name='todo-detail'),
]