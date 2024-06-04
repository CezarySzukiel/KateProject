from django.db import models


class Post (models.Model):
	title = models.CharField(max_length=128, unique=True)
	author = models.CharField(max_length=128)
	post = models.TextField()