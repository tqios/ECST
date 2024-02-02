from django.db import models

# from backend.user.models import User

# Create your models here.
'''
    study
        - id                : 고유번호 (자동 생성)
        - user_id           : 공부 사용자 아이디
        - study_todo        : 공부 항목
        - study_time        : 공부 시간
        - study_completed   : 공부 완료
        - study_status      : 공부 중인가
        - study_description : 공부 상세 기록 (필요없으면 지우셈)

'''

class Study(models.Model):
    user_id = models.CharField(max_length=300)
    study_todo = models.CharField(max_length=300)
    study_time = models.TimeField(auto_now_add=True)
    study_completed = models.BooleanField(default=False)
    study_status = models.TimeField(auto_now_add=True)
    study_description = models.CharField(max_length=300)

    def __str__(self):
        return self.study_todo