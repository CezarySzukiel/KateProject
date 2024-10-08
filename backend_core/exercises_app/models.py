from enum import unique
from tokenize import blank_re

from django.db import models
from django.core.exceptions import ValidationError

from blog.models import Post


class Exercise(models.Model):
    """Model representing an exercise.
    solution_exactly means solution exactly for this exercise,
    solution_similar means solution for a similar task
    type means the type of task: 1 - open task, 2 - multiple choice, etc.
    advanced_level means whether the task is advanced or basic.
    ask1 and 2 are used in type4 exercises. In the future can be changed to one list field."""
    title = models.CharField(max_length=128, unique=True)
    description = models.TextField()
    ask1 = models.TextField(null=True, blank=True)
    ask2 = models.TextField(null=True, blank=True)
    section = models.ForeignKey('Section', on_delete=models.PROTECT, related_name='exercises')
    subsection = models.ForeignKey('Subsection', on_delete=models.PROTECT, related_name='exercises', null=True, blank=True)
    subsubsection = models.ForeignKey('Subsubsection', on_delete=models.PROTECT, related_name='exercises', null=True, blank=True)
    difficult = models.IntegerField()
    points = models.IntegerField()
    solution_exactly = models.ForeignKey(Post, on_delete=models.PROTECT, null=True, blank=True, related_name='exercises_exactly')
    solution_similar = models.ForeignKey(Post, on_delete=models.PROTECT, null=True, blank=True, related_name='exercises_similar')
    type = models.IntegerField()
    advanced_level = models.BooleanField(default=False)
    exam = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title


class Answer(models.Model):
    """Model representing an answer to an exercise.
    For multiple choice exercises, correct means whether the answer is one of the correct answers.
    second_set concerns the justifications that need to be selected for the answer.
    """
    exercise = models.ForeignKey('Exercise', on_delete=models.CASCADE, related_name='answers')
    answer = models.TextField(null=True, blank=True)
    correct = models.BooleanField(default=True)
    second_set = models.BooleanField(default=False)

    def __str__(self):
        return self.answer if self.answer else 'null'

    class Meta:
        ordering = ['id']


class Subsubsection(models.Model):
    """Model representing a subsubsection of exercises"""
    name = models.CharField(max_length=128)
    subsection = models.ForeignKey('Subsection', on_delete=models.PROTECT, related_name='subsubsections')

    def __str__(self):
        return self.name


class Subsection(models.Model):
    """Model representing a subsection of exercises"""
    name = models.CharField(max_length=128, unique=True)
    section = models.ForeignKey('Section', on_delete=models.PROTECT, related_name='subsections')

    def __str__(self):
        return self.name

    @staticmethod
    def get_sort_choices():
        """Gets unique values and returns a list of tuples"""
        sort_values = Subsection.objects.values_list('name', flat=True).distinct().order_by('name')
        return [(value, value) for value in sort_values]


class Section(models.Model):
    """Model representing a section of exercises"""
    name = models.CharField(max_length=128, unique=True)

    def __str__(self):
        return self.name


class Function(models.Model):
    """Model representing a function for an exercise.
    a, b, c are main coefficients used for every function.
    coefficients is a list of optional, additional coefficients for polynomial function.
    x_start, x_end, x_step are used for plotting the function."""
    FUNCTION_CHOICES = [
        ('linear', 'Linear'),
        ('quadratic', 'Quadratic'),
        ('inverse', 'Inverse'),
        ('sinusoidal', 'Sinusoidal'),
        ('logarithmic', 'Logarithmic'),
        ('exponential', 'Exponential'),
        ('square_root', 'Square Root'),
        ('polynomial', 'Polynomial'),
        ('step', 'Step'),
    ]
    function_type = models.CharField(max_length=20, choices=FUNCTION_CHOICES)
    exercises = models.ManyToManyField('Exercise', related_name='functions', related_query_name='function')
    answer = models.ForeignKey('Answer', on_delete=models.CASCADE, related_name='functions', null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    legend = models.CharField(max_length=128, null=True, blank=True)
    a = models.FloatField()
    b = models.FloatField(null=True, blank=True)
    c = models.FloatField(null=True, blank=True)
    coefficients = models.JSONField(null=True, blank=True)
    x_start = models.FloatField(default=-10)
    x_end = models.FloatField(default=10)
    x_step = models.FloatField(default=1)
    x_offset = models.FloatField(default=0)
    y_step = models.FloatField(default=1)
    y_offset = models.FloatField(default=0)

    def __str__(self):
        exercise_ids = self.exercises.values_list('id', flat=True)
        return f"Function type: {self.function_type}, Exercises: {', '.join(map(str, exercise_ids))}"

    def clean(self):
        required_fields = []
        optional_fields = ['a', 'b', 'c']

        if self.function_type == 'linear':
            required_fields = ['a', 'b']
        elif self.function_type == 'quadratic':
            required_fields = ['a', 'b', 'c']
        elif self.function_type == 'inverse':
            required_fields = ['a']
        elif self.function_type == 'sinusoidal':
            required_fields = ['a', 'b', 'c']
        elif self.function_type == 'logarithmic':
            required_fields = ['a']
        elif self.function_type == 'exponential':
            required_fields = ['a']
        elif self.function_type == 'square_root':
            required_fields = ['a']
        elif self.function_type == 'step':
            required_fields = ['a']

        for field in required_fields:
            if getattr(self, field) is None:
                raise ValidationError(f'{field} is required for {self.function_type} function.')

        for field in optional_fields:
            if field not in required_fields and getattr(self, field) is not None:
                raise ValidationError(f'{field} should not be provided for {self.function_type} function.')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class AdditionalText(models.Model):
    """Model representing additional text for an exercise."""
    PLACE_CHOICES = [
        ('intro', 'Intro'),
        ('description', 'Description'),
        ('answerTable', 'AnswerTable'),
        ('between_sets', 'BetweenSets'),
        ('under_draw', 'UnderDraw'),
    ]
    place = models.CharField(max_length=20, choices=PLACE_CHOICES)
    exercise = models.ManyToManyField('Exercise', related_name='additional_texts', related_query_name='additional_text')
    text = models.TextField(unique=True)
    true_answer = models.ForeignKey('Answer', on_delete=models.PROTECT, related_name='additional_texts', null=True, blank=True)

    def __str__(self):
        return self.text if self.text else ''


class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    description = models.TextField(null=True, blank=True)
    exercise = models.ManyToManyField('Exercise', related_name='images', related_query_name='image')
    answer = models.ForeignKey('Answer', on_delete=models.CASCADE, related_name='images', null=True, blank=True)
