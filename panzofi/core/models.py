from django.db import models
from django.contrib.auth.models import User

# LANDING PAGE
class LandingPage(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    logo = models.ImageField(upload_to='logos/')
    
    def __str__(self):
        return f"Landing page {self.title}"

class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session_start = models.DateTimeField(auto_now_add=True)
    session_end = models.DateTimeField(null=True, blank=True)
    session_duration = models.FloatField(null=True, blank=True)  # Duración en segundos
    button_1_clicks = models.PositiveIntegerField(default=0)  # Contador de clics en el botón 1
    button_2_clicks = models.PositiveIntegerField(default=0)  # Contador de clics en el botón 2

    def __str__(self):
        return f"Activity for {self.user.username}"

