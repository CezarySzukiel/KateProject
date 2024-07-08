from django.db import models


class Post (models.Model):
	title = models.CharField(max_length=128, unique=True)
	author = models.CharField(max_length=128)
	post = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	subsection = models.ForeignKey('exercises_app.Subsection', on_delete=models.PROTECT, null=True, blank=True, related_name='posts')

	def __str__(self):
		return self.title
