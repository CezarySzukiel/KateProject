from rest_framework import serializers

from .models import Post


class PostListSerializer(serializers.ModelSerializer):
    """Serializer for posts list."""

    class Meta:
        model = Post
        fields = ('id', 'title', 'author', 'post')
        read_only_fields = ('id',)
