from rest_framework import serializers
from .models import UserSettings

class UserSettingsSerializer(serializers.ModelSerializer):
	# email = serializers.EmailField(source='user.email', read_only=True) etc
	
	class Meta:
		model = UserSettings
		fields = ("user", "level", "points", "exercises", )
