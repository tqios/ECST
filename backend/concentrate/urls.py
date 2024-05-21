from django.urls import path, include
from .views import RecordConcentrate
from rest_framework import routers


urlpatterns = [
    path('concentrate/record/', RecordConcentrate.as_view(), name='record'),
]