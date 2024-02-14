from django.urls import path, include
from .views import StudyList, StudyDetail
from rest_framework import routers


urlpatterns = [
    path('study/', StudyList.as_view(), name='study-list'),
    path('study/detail/', StudyDetail.as_view(), name='study')
    # path('todo/<int:pk>/', TodoDetail.as_view(), name='todo-detail'),
]