from datetime import timedelta

from django.http import Http404
# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Concentrate
# from . import serializers, models
# from ..user.models import User

from .serializers import ConcentrateSerializer
# Create your views here.

class RecordConcentrate(APIView):
    def post(self, request):
        print("데이터를 저장하는걸 시작해보자")

        serializer = ConcentrateSerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        print("집중도 데이터 get안이긴 해")
        study_user_email = request.GET.get('email', None)

        print(study_user_email)

        if not study_user_email:
            return Response(status=400, data={"message": "세션에 사용자 이메일이 없습니다."})

        # 사용자 이메일로 사용자 정보 가져오기
        concentrateData = Concentrate.objects.filter(study_user_email=study_user_email)

        # 직렬화하기
        serializer = ConcentrateSerializer(concentrateData, many=True)
        return Response(status=200, data=serializer.data)


