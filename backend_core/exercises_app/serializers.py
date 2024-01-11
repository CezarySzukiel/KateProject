from rest_framework import serializers

from .models import Exercise, Section


class ExerciseSerializer(serializers.ModelSerializer):
    """Serializer for Exercise model."""
    subsection = serializers.PrimaryKeyRelatedField()
    solution_similar = serializers.PrimaryKeyRelatedField(many=True)

    class Meta:
        model = Exercise
        fields = (
            'id', 'title', 'description', 'subsection', 'difficult', 'points', 'solution_exactly', 'solution_similar',
            'type', 'advanced_level',)
        read_only_fields = ('id',)


class AnswerSerializer(serializers.ModelSerializer):
    """Serializer for Answer model."""
    exercise = serializers.PrimaryKeyRelatedField()

    class Meta:
        model = Exercise
        fields = ('id', 'exercise', 'answer', 'correct',)
        read_only_fields = ('id',)


class SectionSerializer(serializers.ModelSerializer):
    """Serializer for Sections model."""

    class Meta:
        model = Section
        fields = ('id', 'name')
        read_only_fields = ('id',)


class SubsectionSerializer(serializers.ModelSerializer):
    """Serializer for Subsections."""
    section = serializers.PrimaryKeyRelatedField()

    class Meta:
        model = Section
        fields = ('id', 'name', 'section')
        read_only_fields = ('id',)
