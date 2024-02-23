from datetime import timedelta

from django.http import Http404
# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Study
from . import serializers, models
from user.models import User

from .serializers import StudySerializer

def calculate_total_study_time(studyTodo):
    total_duration_time = sum(v.study_duration.total_seconds() for v in studyTodo)
    total_hours = total_duration_time // 3600
    total_minutes = (total_duration_time % 3600) // 60
    total_seconds = total_duration_time % 60
    return f"{total_hours}:{total_minutes}:{total_seconds}"


# Create your views here.

class StudyList(APIView):
    def post(self, request):
        print("데이터를 저장하는걸 시작해보자")

        serializer = serializers.StudySerializer(data=request.data)
        print(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            # study = serializer.save(user=request.user)  # 추가 속성 설정
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        print("studylist안이긴 해")
        study_user_email = request.GET.get('email', None)

        print(study_user_email)

        if not study_user_email:
            return Response(status=400, data={"message": "세션에 사용자 이메일이 없습니다."})

        # 사용자 이메일로 사용자 정보 가져오기
        studyTodo = Study.objects.filter(study_user_email=study_user_email)
        # 전체 공부한 시간 계산하기
        total_duration_time = 0
        if studyTodo : total_duration_time = sum(v.study_duration.total_seconds() for v in studyTodo)


        # 시간을 시, 분, 초로 변환
        total_hours = total_duration_time // 3600
        total_minutes = (total_duration_time % 3600) // 60
        total_seconds = total_duration_time % 60

        # Serializer에 전달할 데이터 업데이트
        data = {'study_duration': total_duration_time}
        print(total_duration_time)

        # 직렬화하기
        serializer = StudySerializer(studyTodo, many=True)

        return Response(status=200, data={"feeds": serializer.data, "user": study_user_email,
                                          "total_duration_time": f"{total_hours}:{total_minutes}:{total_seconds}"})


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

    # 시간 더하기
    def post(self, request, pk):

        study = self.get_object(pk)

        # 요청으로부터 전달된 시간 데이터 가져오기
        time = request.data.get('time', 0)


        # 'int' 타입으로 전달된 시간을 'timedelta' 객체로 변환하여 기존 시간에 더하기
        new_duration = study.study_duration + timedelta(seconds=int(time))
        print(new_duration)

        # Serializer에 전달할 데이터 업데이트
        data = {'study_duration': new_duration.total_seconds()}
        serializer = serializers.StudySerializer(study, data=data, partial=True)

        study_user_email = request.GET.get('email', None)

        # 사용자 이메일로 사용자 정보 가져오기

        # serializer = serializers.StudySerializer(study, data=request.data, partial=True)
        if serializer.is_valid():
            # 기존 study_duration 값과 새로운 시간을 더하여 업데이트합니다.
            # new_duration = study.study_duration + request.data.get('time', 0)
            # serializer.validated_data['study_duration'] = new_duration
            serializer.save()
            return Response(serializer.data)
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
