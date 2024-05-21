from django.db import models

from django.conf import settings


# Create your models here.
'''
    concentrate
        - study_user_email  : 고유번호 (자동 생성)
        - concentrate_date  : 집중한 날짜
        - concentrate_average_value : 집중 평균 값
        - concentrate_time  : 집중시간
        
        --------------------------------
        

'''

class Concentrate(models.Model):
    '''
        settings.AUTH_USER_MODEL : 어떤 클래스와 연결되고 어느 app의 model인자에 대한 정보를 가지는지에 대한 정보를 적는다. 여기서만, get_user_model() 을 쓰지 않는다.
        on_delete :  삭제시 어떤 행동을 하는지 적는다
    '''
    study_user_email = models.CharField(max_length=300)
    concentrate_date = models.DateField()
    concentrate_average_value = models.DecimalField(max_digits=5, decimal_places=2)
    concentrate_time = models.TimeField()

    USERNAME_FIELD = 'study_user_email'

    class Meta:
        db_table = "Concentrate"