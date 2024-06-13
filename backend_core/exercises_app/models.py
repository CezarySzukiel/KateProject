from django.db import models
from django.urls import reverse
from django.utils.text import slugify

from blog.models import Post


class Exercise(models.Model):
    """Model representing an exercise.
    solution_exactly means solution exactly for this exercise,
    solution_similar means solution for a similar task
    type means the type of task: 1 - open task, 2 - multiple choice, etc.
    advanced_level means whether the task is advanced or basic"""
    title = models.CharField(max_length=128, unique=False)
    description = models.TextField()
    ask1 = models.TextField(null=True, blank=True)
    ask2 = models.TextField(null=True, blank=True)
    subsection = models.ForeignKey('Subsection', on_delete=models.PROTECT, related_name='exercises')
    difficult = models.IntegerField()
    points = models.IntegerField()
    solution_exactly = models.ForeignKey(Post, on_delete=models.PROTECT, null=True, blank=True, related_name='exercises_exactly')
    solution_similar = models.ForeignKey(Post, on_delete=models.PROTECT, null=True, blank=True, related_name='exercises_similar')
    type = models.IntegerField()
    advanced_level = models.BooleanField(default=False)
    exam = models.DateField(null=True, blank=True)
    slug = models.SlugField(max_length=128, unique=False, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Answer(models.Model):
    """Model representing an answer to an exercise.
    For multiple choice exercises, correct means whether the answer is one of the correct answers.
    second_set concerns the justifications that need to be selected for the answer.
    """
    exercise = models.ForeignKey('Exercise', on_delete=models.CASCADE, related_name='answers')
    answer = models.TextField()
    correct = models.BooleanField(default=True)
    second_set = models.BooleanField(default=False)

    def __str__(self):
        return self.answer


class Subsection(models.Model):
    """Model representing a subsection of exercises"""
    name = models.CharField(max_length=128, unique=True)
    section = models.ForeignKey('Section', on_delete=models.PROTECT, related_name='subsections')
    slug = models.SlugField(max_length=128, unique=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @staticmethod
    def get_sort_choices():
        """Gets unique values and returns a list of tuples"""
        sort_values = Subsection.objects.values_list('name', flat=True).distinct().order_by('name')
        return [(value, value) for value in sort_values]


class Section(models.Model):
    """Model representing a section of exercises"""
    name = models.CharField(max_length=128, unique=True)
    slug = models.SlugField(max_length=128, unique=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Function(models.Model):
    FUNCTION_CHOICES = [
        ('linear', 'Linear'),
        ('quadratic', 'Quadratic'),
        ('inverse', 'Inverse'),
        ('sinusoidal', 'Sinusoidal'),
        ('logarithmic', 'Logarithmic'),
        ('exponential', 'Exponential'),
        ('square_root', 'Square Root'),
        ('polynomial', 'Polynomial'),
        ('absolute', 'Absolute'),
        ('step', 'Step'),
    ]
    function_type = models.CharField(max_length=20, choices=FUNCTION_CHOICES)
    exercise = models.ForeignKey('Exercise', on_delete=models.CASCADE, related_name='functions')
    a = models.FloatField()
    b = models.FloatField(null=True, blank=True)
    c = models.FloatField(null=True, blank=True)
    coefficients = models.JSONField(null=True, blank=True)
    x_start = models.FloatField(default=-10)
    x_end = models.FloatField(default=10)
    x_step = models.FloatField(default=1)
    x_offset = models.FloatField(default=0)
    y_offset = models.FloatField(default=0)

    def __str__(self):
        return f"{self.get_function_type_display()} function"