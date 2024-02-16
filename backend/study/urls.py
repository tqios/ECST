from django.urls import path, include
from .views import StudyList, StudyDetail
from rest_framework import routers


urlpatterns = [
    path('study/', StudyList.as_view(), name='study-list'),
    path('study/<int:pk>/', StudyDetail.as_view(), name='study')
    # path('study/<int:pk>/', TodoDetail.as_view(), name='todo-detail'),
]