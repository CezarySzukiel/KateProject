from rest_framework import serializers

from .models import Exercise, Section, Subsection, Answer


class ExercisesListSerializer(serializers.ModelSerializer):
    """Serializer for exercises list."""

    class Meta:
        model = Exercise
        fields = ('id', 'title', 'description')
        read_only_fields = fields


class AnswerSerializer(serializers.ModelSerializer):
    """Serializer for Answer model."""
    class Meta:
        model = Answer
        fields = ('answer', 'correct', 'second_set')


class ExerciseDetailSerializer(serializers.ModelSerializer):
    """Serializer for single exercise details"""

    subsection = serializers.PrimaryKeyRelatedField(queryset=Subsection.objects.all())
    solution_similar = serializers.PrimaryKeyRelatedField(many=True, queryset=Exercise.objects.all())
    answers = AnswerSerializer(many=True)
    exam = serializers.DateField(format='%Y-%m', input_formats=('%Y-%m', ), required=False)

    class Meta:
        model = Exercise
        fields = (
            'id', 'title', 'description', 'ask1', 'ask2', 'subsection', 'difficult', 'points', 'solution_exactly', 'solution_similar',
            'type', 'advanced_level', 'answers', 'exam', )
        read_only_fields = ('id',)

    def get_correct_answer(self, obj):
        if hasattr(obj, 'correct_answer'):
            return obj.correct_answer.answer
        return None


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
    id = serializers.IntegerField()
    answers = serializers.ListField(
        child=serializers.CharField()
    )