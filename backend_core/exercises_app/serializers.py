from rest_framework import serializers

from .models import Exercise, Section, Subsection, Answer, Function, AdditionalText


class ExercisesListSerializer(serializers.ModelSerializer):
    """Serializer for exercises list."""

    class Meta:
        model = Exercise
        fields = ('id', 'title', 'description')
        read_only_fields = fields


class FunctionSerializer(serializers.ModelSerializer):
    """Serializer for Function model."""

    answer = serializers.PrimaryKeyRelatedField(queryset=Answer.objects.all(), required=False)

    class Meta:
        model = Function
        fields = ('id', 'function_type', 'a', 'b', 'c', 'coefficients', 'x_start', 'x_end', 'x_step', 'x_offset',
                  'y_step', 'y_offset', 'description', 'legend', 'answer')
        read_only_fields = ('id',)


class AnswerSerializer(serializers.ModelSerializer):
    """Serializer for Answer model."""
    functions = FunctionSerializer(many=True, read_only=True)

    class Meta:
        model = Answer
        fields = ('answer', 'correct', 'second_set', 'functions',)


class AdditionalTextSerializer(serializers.ModelSerializer):
    """Serializer for AdditionalText model."""

    class Meta:
        model = AdditionalText
        fields = ('id', 'text', 'exercise', 'place', 'true_answer')
        read_only_fields = ('id',)


class ExerciseDetailSerializer(serializers.ModelSerializer):
    """Serializer for single exercise details"""

    subsection = serializers.PrimaryKeyRelatedField(queryset=Subsection.objects.all())
    solution_similar = serializers.PrimaryKeyRelatedField(many=True, queryset=Exercise.objects.all())
    answers = AnswerSerializer(many=True)
    functions = FunctionSerializer(many=True)
    exam = serializers.DateField(format='%Y-%m', input_formats=('%Y-%m',), required=False)
    additional_texts = AdditionalTextSerializer(many=True, read_only=True)

    class Meta:
        model = Exercise
        fields = (
            'id', 'title', 'description', 'ask1', 'ask2', 'subsection', 'difficult', 'points', 'solution_exactly',
            'solution_similar',
            'type', 'advanced_level', 'answers', 'functions', 'exam', 'additional_texts',)
        read_only_fields = ('id',)

    def get_correct_answer(self, obj):
        if hasattr(obj, 'correct_answer'):
            return obj.correct_answer.answers
        return None

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['functions'] = FunctionSerializer(
            instance.functions.filter(answer__isnull=True), many=True
        ).data
        return representation


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
