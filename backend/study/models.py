from django.db import models

from django.conf import settings


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
    '''
        settings.AUTH_USER_MODEL : 어떤 클래스와 연결되고 어느 app의 model인자에 대한 정보를 가지는지에 대한 정보를 적는다. 여기서만, get_user_model() 을 쓰지 않는다.
        on_delete :  삭제시 어떤 행동을 하는지 적는다
    '''
    study_user_email = models.CharField(max_length=300)
    study_todo = models.CharField(max_length=300)
    study_time = models.TimeField(auto_now_add=True)
    study_completed = models.BooleanField(default=False)
    study_status = models.TimeField(auto_now_add=True)
    study_description = models.CharField(max_length=300)

    def __str__(self):
        return f'{self.id}번째글 - {self.study_todo}'