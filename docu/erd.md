![[Pasted image 20240201155458.png]]

[[ERD canvas.canvas|ERD canvas]]
위의 ERD로 수정했다.

```bash
python manage.py makemigrations
SystemCheckError: System check identified some issues:

ERRORS:
user.User: (auth.E003) 'User.user_name' must be unique because it is named as the 'USERNAME_FIELD'.
(env) PS C:\Users\leath\ECST\backend> python manage.py makemigrations
Migrations for 'study':
  study\migrations\0001_initial.py
    - Create model Study
Migrations for 'user':
  user\migrations\0001_initial.py
    - Create model User
(env) PS C:\Users\leath\ECST\backend>

```

이렇게 study와 user테이블을 만들었다.

`user model`

```python
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
        ---------------------------------------        (실제)
        user            - id                    : 고유번호 (자동 생성)
            - user_name             : 사용자 이름
            - user_email            : 사용자 이메일
            - user_password         : 사용자 비밀번호
            - user_login_id         : 사용자 로그인 아이디
            - user_phone_number     : 사용자 전화번호
    '''    user_name = models.CharField(max_length=24, unique=True)
    user_email = models.EmailField(unique=True)
    user_password = models.CharField(max_length=24, unique=False)
    user_login_id = models.CharField(max_length=24, unique=False)
    user_phone_number = models.IntegerField(unique=True)


    USERNAME_FIELD = 'user_name'

    class Meta:
        db_table = "User"
```

`study model`

```python
from django.db import models

# from backend.user.models import User

# Create your models here.
'''
    study        - id                : 고유번호 (자동 생성)
        - user_id           : 공부 사용자 아이디
        - study_todo        : 공부 항목
        - study_duration        : 공부 시간
        - study_completed   : 공부 완료
        - study_status      : 공부 중인가
        - study_description : 공부 상세 기록 (필요없으면 지우셈)

'''

class Study(models.Model):
    user_id = models.CharField(max_length=300)
    study_todo = models.CharField(max_length=300)
    study_duration = models.TimeField(auto_now_add=True)
    study_completed = models.BooleanField(default=False)
    study_status = models.TimeField(auto_now_add=True)
    study_description = models.CharField(max_length=300)

    def __str__(self):
        return self.study_todo
```

serializer은 직렬화로 데이터를 관리할 수 있다는 장점이 있는데,,
사용자 정보를 직렬화로 관리하면 안될것같다고 생각했다.

어쨋든 보안이 요구되는 데이터인데 뭔가 이렇게 공개되는게 맞나?라고 생각이 들었음
(serializer가 뭔지 정확한 이해는 아직되지않았지만말이다.)

무튼 user쪽 모델에서는 `user_name`이라는 고유키로 데이터를 관리하고, study쪽에서는 해당 스터디 정보드르을 싹다 문자열로서 가져올 수 있도록 구성했다.

이제 해야할 것은 사용자마다의 study todo 리스트를 올바르게 연결해주어야 한다.
그리고 백과 프론트 사이에 rest 통신을 정의해야한다.

`backend.settings`
이곳은 메인으로 돌아가는 서버의 설정 파일이다.

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('todo.urls')),
    path('api/', include('study.urls')),
    path('api/', include('user.urls'))
]
```

study.urls

```python
from django.urls import path, include
from .views import StudyList
from rest_framework import routers


urlpatterns = [
    path('study/', StudyList.as_view(), name='todo-list'),
    # path('todo/<int:pk>/', TodoDetail.as_view(), name='todo-detail'),
]
```

user.urls

```python
from django.urls import path, include
from .views import *
from rest_framework import routers


urlpatterns = [
    path('join/', Join.as_view()),
    # path('login/', Login.as_view()),
    # path('logout/', LogOut.as_view()),    # path('profile/upload', UploadProfile.as_view())    # path('todo/<int:pk>/', TodoDetail.as_view(), name='todo-detail'),
]
```

각각의 app에서 이렇게 urls를 연결했다.
아직 설계하고 있는 단계인데 점차 필요한 기능들은 추가할 계획에 있다.

또한 각 app에 view에서 데이터 동작을 정의하고 serializer도 만들어줬다. 이 방식은 그 전에 todo를 만들때와 동일한 방식으로 만들어주었기 때문에 그냥 그런갑다하고 넘어가면 될 것 같다.

backend.settings에

```python
AUTH_USER_MODEL = "user.User"

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # External Apps
    'rest_framework',
    'corsheaders',
    # Internal Apps
    'todo',
    'study',
    'user'
]
```

이 두가지를 설정해주어야 한다.
'AUTH_USER_MODEL'은 내가 정의한 user모델로 유저를 생성할 수 있다. 저 문구가 없다면 장고에서 기본적으로 제공해주는 유저모델로 migration하기 때문에 내가 열심히 쓴 유저모델이 제대로 적용되지 않을 것이다.

두번째로 `INSTALLED_APPS`에 내가 새로이 추가한 어플들의 이름을 추가로 적어준다.

그러면 이 글의 맨 처음에 나온 bash결과를 확인할 수 있다.
아래의 명령어를 실행하자

```bash
python manage.py makemigrations

python manage.py migrate
```

이 과정에서
에러가 났

[InconsistentMigrationHistory 이슈 발생시 해결방법 (tistory.com)](https://simon-yoon.tistory.com/89)
이 글을 참고해서 해결했다.
