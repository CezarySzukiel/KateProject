from django.contrib.auth.models import AbstractUser, User
from django.db import models

from exercises_app.models import Exercise


class CustomUser(AbstractUser):
    pass


class UserSettings(models.Model):
    """User settings model.
    One to one relation with User model,
    level - True if user have advanced math skills"""
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    level = models.BooleanField(default=False)
    points = models.IntegerField(default=0)
    exercises = models.ManyToManyField(Exercise, blank=True, related_name='exercises')

    def __str__(self):
        return self.user.username
