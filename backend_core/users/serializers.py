from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer

from .models import CustomUser, UserSettings

class UserSettingsSerializer(serializers.ModelSerializer):
	# email = serializers.EmailField(source='user.email', read_only=True) etc
	
	class Meta:
		model = UserSettings
		fields = ("user", "level", "points", "exercises", )


class CustomUserDetailsSerializer(UserDetailsSerializer):
    level = serializers.BooleanField(source='usersettings.level', read_only=False)
    points = serializers.IntegerField(source='usersettings.points', read_only=True)

    class Meta:
        model = CustomUser
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'level', 'points')
        read_only_fields = ('pk', 'email', 'points')
