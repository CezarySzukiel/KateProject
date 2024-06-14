from django.contrib import admin

from . import models

admin.site.register(models.Exercise)
admin.site.register(models.Answer)
admin.site.register(models.Section)
admin.site.register(models.Subsection)
admin.site.register(models.Function)
