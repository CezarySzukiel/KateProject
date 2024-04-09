from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView,  RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import UserSettings
from .serializers import UserSettingsSerializer


class UserSettingsListView(ListCreateAPIView):
	permission_classes = [AllowAny] #todo change it!
	queryset = UserSettings.objects.all()
	serializer_class = UserSettingsSerializer

class UserSettingsDetailView(RetrieveUpdateDestroyAPIView):
	permission_classes = [AllowAny] #todo change it!
	queryset = UserSettings.objects.all()
	serializer_class = UserSettingsSerializer
