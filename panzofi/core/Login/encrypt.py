from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

# Nueva contraseña que quieres aplicar en formato hasheado
new_password = 'password123*'
hashed_password = make_password(new_password)

# Actualizar todas las contraseñas de los usuarios
User.objects.all().update(password=hashed_password)

print("Las contraseñas han sido actualizadas con éxito.")