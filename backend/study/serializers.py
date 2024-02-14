from rest_framework import serializers
from . import models

class StudySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Study
        fields = ['id','study_user_email','study_todo','study_time','study_time','study_completed','study_status','study_description'];
        # exclude = ('user',)