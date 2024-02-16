from django.http import Http404
# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Study
from . import serializers, models
from user.models import User

from .serializers import StudySerializer


# Create your views here.

class StudyList(APIView):
    def post(self, request):
        # print("studylist안이긴 해")
        study_user_email = request.POST.get('email', None)

        # print(study_user_email)

        if not study_user_email:
            return Response(status=400, data={"message": "세션에 사용자 이메일이 없습니다."})

        # 사용자 이메일로 사용자 정보 가져오기
        studyTodo = Study.objects.filter(study_user_email=study_user_email)

        # 직렬화하기
        serializer = StudySerializer(studyTodo, many=True)

        return Response(status=200, data={"feeds": serializer.data, "user": study_user_email})




class StudyDetail(APIView):

    def get_object(self, pk):
        try:
            return models.Study.objects.get(pk=pk)
        except models.Study.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        study = self.get_object(pk)
        serializer = serializers.StudySerializer(study)
        return Response(serializer.data)


    def post(self, request):
        serializer = serializers.StudySerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            # study = serializer.save(user=request.user)  # 추가 속성 설정
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def patch(self, request, pk):
        study = self.get_object(pk)
        serializer = serializers.StudySerializer(study, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        study = self.get_object(pk)
        study.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
