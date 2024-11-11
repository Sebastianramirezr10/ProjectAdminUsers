from rest_framework import serializers
from .models import LandingPage,UserActivity

# Serializador para LandingPage
class LandingPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandingPage
        fields = ['title', 'description', 'logo']


class UserActivitySerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)  # Obtener el nombre de usuario

    class Meta:
        model = UserActivity
        fields = ['user_username', 'session_start', 'session_duration', 'button_1_clicks', 'button_2_clicks']