from rest_framework import serializers
from . import models


class ConcentrateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Concentrate
        fields = "__all__"


