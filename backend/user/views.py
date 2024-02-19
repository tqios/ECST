import os
from urllib import request
from uuid import uuid4

from django.contrib.auth.hashers import make_password, check_password

from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from . import serializers

from .models import User

# Create your views here.
class Join(APIView):

    def get(self, request):
        return Response(status=200)
    def post(self, request):
         # todo 회원가입
         # TODO : 유효성 검사
        '''
            - user_name             : 사용자 이름
            - user_email            : 사용자 이메일
            - user_password         : 사용자 비밀번호
            - user_login_id         : 사용자 로그인 아이디
            - user_phone_number     : 사용자 전화번호
        '''
        user_name = request.data.get('user_name')
        user_email = request.data.get('user_email')
        user_password = request.data.get('user_password')
        user_login_id = request.data.get('user_login_id')
        user_phone_number = request.data.get('user_phone_number')
        print("회원가입 정보를 가저왔음 by post")

        User.objects.create(user_name=user_name,
                           user_email=user_email,
                           user_password=make_password(user_password),
                           user_login_id=user_login_id,
                           user_phone_number=user_phone_number)
        return Response(status=200)
class Login(APIView):
    def get(self, request):
        # TODO 로그인
        print("로그인시도")
        email = request.GET.get('signin_email', None)
        password = request.GET.get('signin_pwd', None)

        print(email)
        print(password)
        user = User.objects.filter(user_email=email).first()
        if user is None:
            return Response(status=400, data=dict(message="회원정보가 잘못되었습니다."))

        if check_password(password, user.user_password):
            print("비번 확인시도")
            # TODO 로그인을 했다. 세션 or 쿠키
            request.session['email'] = email

            return Response(status=200, data=dict(email=email))
        else:
            print("비번 확이 ㄴ실패")
            return Response(status=400, data=dict(message="회원정보가 잘못되었습니다."))

    def post(self, request):
        # serializer = serializers.UserSerializer(data=request.data)
        # print(serializer)
        # TODO 로그인
        print("로그인시도")
        email = request.POST.get('signin_email', None)
        password = request.POST.get('signin_pwd', None)

        print(email)
        print(password)
        user = User.objects.filter(user_email=email).first()
        if user is None:
            return Response(status=400, data=dict(message="회원정보가 잘못되었습니다."))

        if check_password(password, user.user_password):
            print("비번 확인시도")
            # TODO 로그인을 했다. 세션 or 쿠키
            request.session['email'] = email

            return Response(status=200, data=dict(email=email))
        else:
            print("비번 확이 ㄴ실패")
            return Response(status=400, data=dict(message="회원정보가 잘못되었습니다."))
