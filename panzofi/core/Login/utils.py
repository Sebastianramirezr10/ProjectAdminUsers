from django.contrib.auth import authenticate
from django.conf import settings
from datetime import datetime, timedelta
import jwt

# Función para autenticar usuario
def authenticate_user(username, password):
    # Intentar autenticar al usuario
    user = authenticate(username=username, password=password)
    if user is not None:
        return user
    else:
        return None

# Función para generar el JWT
def generate_jwt(user):
    token = jwt.encode({
        'user_id': user.id,
        'username': user.username,
        'is_staff': user.is_staff,  # Si el usuario es admin
        'exp': datetime.utcnow() + timedelta(hours=1)  # Expiración del token
    }, settings.SECRET_KEY, algorithm='HS256')
    return token
