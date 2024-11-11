from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .utils import authenticate_user, generate_jwt

# Vista de login
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Autenticar al usuario
    user = authenticate_user(username, password)

    if user is not None:
        # Si el usuario es válido, generar el JWT
        token = generate_jwt(user)
        return Response({'token': token})
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
