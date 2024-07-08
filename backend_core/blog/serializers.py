from rest_framework import serializers

from .models import Post


class PostListSerializer(serializers.ModelSerializer):
    """Serializer for posts list."""

    class Meta:
        model = Post
        fields = ('id', 'title', 'author', 'created_at', 'subsection')
        read_only_fields = (fields)


class PostFilterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'author', 'post', 'created_at', 'subsection']
