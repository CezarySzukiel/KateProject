from django.db import models
from django.urls import reverse
from django.utils.text import slugify


class Exercise(models.Model):
    """Model representing an exercise.
    solution_exactly means solution exactly for this exercise,
    solution_similar means solution for a similar task
    type means the type of task: 1 - open task, 2 - multiple choice, etc.
    advanced_level means whether the task is advanced or basic"""
    title = models.CharField(max_length=64, unique=True)
    description = models.TextField()
    subsection = models.ForeignKey('Subsection', on_delete=models.PROTECT, related_name='exercises')
    difficult = models.IntegerField()
    points = models.IntegerField()
    solution_exactly = models.TextField(null=True, blank=True)
    solution_similar = models.ManyToManyField('self', null=True, blank=True)
    type = models.IntegerField()
    advanced_level = models.BooleanField(default=False)
    slug = models.SlugField(max_length=64, unique=True, blank=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


class Answer(models.Model):
    """Model representing an answer to an exercise.
    For multiple choice exercises, correct means whether the answer is one of the correct answers"""
    exercise = models.ForeignKey('Exercise', on_delete=models.CASCADE, related_name='answers')
    answer = models.TextField()
    correct = models.BooleanField(default=True)

    def __str__(self):
        return self.answer


class Section(models.Model):
    """Model representing a section of exercises"""
    name = models.CharField(max_length=128, unique=True)
    slug = models.SlugField(max_length=64, unique=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Subsection(models.Model):
    """Model representing a subsection of exercises"""
    name = models.CharField(max_length=128, unique=True)
    section = models.ForeignKey('Section', on_delete=models.PROTECT, related_name='subsections')
    slug = models.SlugField(max_length=64, unique=True, blank=True)

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
