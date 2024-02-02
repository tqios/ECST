from rest_framework import serializers
from . import models

class StudySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Study
        fields = '__all__'