from django.shortcuts import render
from rest_framework import viewsets, permissions, generics

from .models import *
from blog.serializers import PostListSerializer

class PostViewSet(viewsets.ModelViewSet):
    """ViewSet for the Post class"""

    queryset = Post.objects.all()
    serializer_class = PostListSerializer
    permission_classes = (permissions.AllowAny, )
