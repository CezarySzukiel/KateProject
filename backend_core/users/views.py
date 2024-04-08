from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,  RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import UserSettings
from .serializers import UserSettingsSerializer


class UsersList(ListCreateAPIView):
	permission_classes = [AllowAny] #todo change it!
	queryset = UserSettings.objects.all()
	serializer_class = UserSettingsSerializer

class UserDetail(RetrieveUpdateDestroyAPIView):
	permission_classes = [AllowAny] #todo change it!
	queryset = UserSettings.objects.all()
	serializer_class UserSettingsSerializer