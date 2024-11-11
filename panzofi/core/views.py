from .models import UserActivity, LandingPage
from .serializers import LandingPageSerializer, UserActivitySerializer
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Obtener datos de la landing page para enviar al frontend
@api_view(['GET'])
def landing_page_info(request):
    try:
        landing_page = LandingPage.objects.first()
        serializer = LandingPageSerializer(landing_page)
        return Response(serializer.data)
    except LandingPage.DoesNotExist:
        return Response({"error": "No landing page found."}, status=404)
    



@api_view(['GET'])
def get_user_info(request):
    # Obtener todas las actividades de los usuarios
    user_activities = UserActivity.objects.all()

    # Serializamos las actividades
    serializer = UserActivitySerializer(user_activities, many=True)

    # Verificar los datos serializados
    print(serializer.data)  # Ver los datos en el backend

    return Response(serializer.data)


# Registrar actividad de usuario (iniciar sesión)
@api_view(['POST'])
def register_user_activity(request):
    user_id = request.data.get('user_id')  # Obtenemos el ID del usuario
    session_start = timezone.now()  # Inicia la sesión en el momento de la petición
    
    # Verifica si ya existe una actividad registrada (sin session_end) para este usuario
    user_activity = UserActivity.objects.filter(user_id=user_id).first()

    if user_activity:
        if user_activity.session_end:
            user_activity.session_start = session_start
            user_activity.session_end = None  # Aseguramos que la sesión está abierta
            user_activity.save()
            return Response({"message": "Activity reopened and updated with new session start."}, status=status.HTTP_200_OK)
        else:
            user_activity.session_start = session_start
            user_activity.save()
            return Response({"message": "Existing active activity updated with new session start."}, status=status.HTTP_200_OK)
    else:
        user_activity = UserActivity.objects.create(user_id=user_id, session_start=session_start)
        return Response({"message": "New user activity created."}, status=status.HTTP_201_CREATED)


# Cerrar sesión y registrar la duración
@api_view(['POST'])
def logout_user_activity(request):
    user_id = request.data.get('user_id')  # Obtenemos el ID del usuario
    session_end = timezone.now()  # Hora de cierre de sesión

    # Busca la actividad de usuario activa (sin session_end)
    user_activity = UserActivity.objects.filter(user_id=user_id, session_end=None).first()
    
    if user_activity:
        # Si la actividad está activa (sin session_end), la cerramos
        user_activity.session_end = session_end
        
        # Si ya hay una duración acumulada, sumamos el tiempo de la sesión
        session_duration = user_activity.session_duration or 0  # Inicializa en 0 si es None

        # Calculamos la duración de la sesión actual
        session_duration += (user_activity.session_end - user_activity.session_start).total_seconds()

        # Guarda la duración total de la sesión en segundos
        user_activity.session_duration = session_duration
        user_activity.save()

        return Response({
            "message": "User activity updated",
            "session_duration": str(session_duration)
        }, status=status.HTTP_200_OK)
    else:
        return Response({"message": "No active session found"}, status=status.HTTP_404_NOT_FOUND)


# Registrar clics en los botones
@api_view(['POST'])
def register_button_click(request):
    user_id = request.data.get('user_id')
    button_name = request.data.get('button_name')

    # Verificar los datos recibidos en el backend
    if not user_id or not button_name:
        return Response({'error': 'user_id and button_name are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Obtiene la actividad activa del usuario
        user_activity = UserActivity.objects.filter(user_id=user_id, session_end=None).first()

        if not user_activity:
            return Response({'error': 'No active session found for this user'}, status=status.HTTP_400_BAD_REQUEST)

        # Verifica qué botón se ha presionado
        if button_name == 'button_1':
            user_activity.button_1_clicks += 1
        elif button_name == 'button_2':
            user_activity.button_2_clicks += 1
        else:
            return Response({'error': 'Invalid button name'}, status=status.HTTP_400_BAD_REQUEST)

        # Guarda los clics actualizados en el modelo
        user_activity.save()

        return Response({
            'message': f"Button {button_name} clicked. Total clicks: {user_activity.button_1_clicks if button_name == 'button_1' else user_activity.button_2_clicks}"
        })

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
