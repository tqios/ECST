from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Study
from . import serializers


# Create your views here.

class StudyList(APIView):
    '''
    - commit=False의 역할

        해당 object는 반환한다.
        SQL의 실제 실행은 하지 않게 한다.

        def create(request):
            if request.method == 'POST':
                form = ArticleForm(request.POST)
                if form.is_valid():
                    article = form.save(commit=False)
                    article.user = request.user
                    article.save()
                    return redirect('articles:detail', article.pk)
            else:
                form = ArticleForm()
            context = {
            return render(request, 'articles/detail.html', context)''
    '''

    def get(self, request):
        study_list = Study.objects.all()  # 모든 todo 리스트 가져옴
        serializer = serializers.StudySerializer(study_list, many=True )  # 직렬화
        return Response(serializer.data)  # 관련 데이터 보냄

    def post(self, request):
        serializer = serializers.StudySerializer(data=request.data)
        if serializer.is_valid():  # 형식이 유효하면
            serializer.save(commit=False)  # 저장
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)