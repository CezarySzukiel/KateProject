from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from django_filters import rest_framework as filters

from .models import *
from blog.serializers import PostListSerializer, PostFilterSerializer

class PostPagination(PageNumberPagination):
    page_size = 10 
    page_size_query_param = 'page_size'
    max_page_size = 100


class PostFilter(filters.FilterSet):
    id = filters.NumberFilter(field_name='id')
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    author = filters.CharFilter(field_name='author', lookup_expr='icontains')
    subsection = filters.CharFilter(field_name='subsection__name', lookup_expr='icontains')
    created_at = filters.OrderingFilter(fields=('created_at',))
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'author', 'subsection', 'created_at']


class PostViewSet(viewsets.ModelViewSet):
    """ViewSet for the Post class"""

    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = (permissions.AllowAny, )


class PostFilterView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PostFilterSerializer
    pagination_class = PostPagination

    def get(self, request, *args, **kwargs):
        query_params = {k: v for k, v in request.GET.items() if v}
        filterset = PostFilter(query_params, queryset=Post.objects.all())
        if not filterset.is_valid():
            return Response(filterset.errors, status=400)

        queryset = filterset.qs.order_by('-created_at') #  hardcoded order_by
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(queryset, request)
        if page is not None:
            serializer = self.serializer_class(page, many=True)
            return paginator.get_paginated_response(serializer.data)

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)