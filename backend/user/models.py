from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models


# Create your models here.
class User(AbstractBaseUser):
    ''' (예시)
        유저 프로필 사진
        유저 닉네임  -> 화면에 표기되는 이름
        유저 이름   -> 실제 사용자 이름
        유저 이메일 주소   0> 회워가입시 사용되는 주소
        유저 비빌번호
        ---------------------------------------
        (실제)
        user
            - id                    : 고유번호 (자동 생성)
            - user_name             : 사용자 이름
            - user_email            : 사용자 이메일
            - user_password         : 사용자 비밀번호
            - user_login_id         : 사용자 로그인 아이디
            - user_phone_number     : 사용자 전화번호
    '''
    user_name = models.CharField(max_length=24, unique=True)
    user_email = models.EmailField(unique=True)
    user_password = models.CharField(max_length=24, unique=False)
    user_login_id = models.CharField(max_length=24, unique=False)
    # user_phone_number = models.IntegerField(unique=True)


    USERNAME_FIELD = 'user_name'

    class Meta:
        db_table = "User"