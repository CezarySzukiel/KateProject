from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from . import models


class CustomUserAdmin(UserAdmin):
    model = get_user_model()


class UserSettingsAdmin(admin.ModelAdmin):
    model = models.UserSettings


admin.site.register(models.CustomUser, CustomUserAdmin)
admin.site.register(models.UserSettings, UserSettingsAdmin)
