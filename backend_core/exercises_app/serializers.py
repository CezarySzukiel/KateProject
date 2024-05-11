from rest_framework import serializers

from .models import Exercise, Section, Subsection, Answer


class ExercisesListSerializer(serializers.ModelSerializer):
    """Serializer for exercises list."""

    class Meta:
        model = Exercise
        fields = ('id', 'title', 'description')
        read_only_fields = fields

class ExerciseDetailSerializer(serializers.ModelSerializer):
    """Serializer for single exercise details"""

    subsection = serializers.PrimaryKeyRelatedField(queryset=Subsection.objects.all())
    solution_similar = serializers.PrimaryKeyRelatedField(many=True, queryset=Exercise.objects.all())
    correct_answer = serializers.SerializerMethodField()

    class Meta:
        model = Exercise
        fields = (
            'id', 'title', 'description', 'subsection', 'difficult', 'points', 'solution_exactly', 'solution_similar',
            'type', 'advanced_level', 'correct_answer', )
        read_only_fields = ('id',)

    def get_correct_answer(self, obj):
        if hasattr(obj, 'correct_answer'):
            return obj.correct_answer.answer
        return None


class AnswerSerializer(serializers.ModelSerializer):
    """Serializer for Answer model."""
    exercise = serializers.PrimaryKeyRelatedField(queryset=Exercise.objects.all())

    class Meta:
        model = Answer
        fields = ('id', 'exercise', 'answer', 'correct',)
        read_only_fields = ('id',)


class SubsectionSerializer(serializers.ModelSerializer):
    """Serializer for Subsections."""
    section = serializers.PrimaryKeyRelatedField(queryset=Section.objects.all())

    class Meta:
        model = Subsection
        fields = ('id', 'name', 'section')
        read_only_fields = ('id',)


class SectionSerializer(serializers.ModelSerializer):
    """Serializer for Sections model."""
    subsections = SubsectionSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = ('id', 'name', 'subsections',)
        read_only_fields = fields


class CompareExerciseSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    answer = serializers.CharField(max_length=200)
