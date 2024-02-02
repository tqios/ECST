from django.db import models

# Create your models here.


class Todo(models.Model):
    body = models.CharField(max_length=300)
    completed = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)


    # __str__ 메서드는 모델 인스턴스를 문자열로 표현할 때 사용됩니다. 여기서는 할 일 항목의 내용을 반환하도록 설정되어 있습니다
    def  __str__(self):
        return self.body