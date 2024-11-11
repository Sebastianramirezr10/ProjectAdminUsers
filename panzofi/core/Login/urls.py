# core/Login/urls.py
from django.urls import path
from . import views  # Asegúrate de que importes las vistas desde Login/views.py

urlpatterns = [
    path('', views.login_user, name='login_user'),  # Aquí llamas a la vista login_user
]
