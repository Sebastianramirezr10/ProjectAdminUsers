from django.urls import path,include
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # Ruta para obtener la información de la landing page
    path('landing-page-info/', views.landing_page_info, name='landing_page_info'),

    # Ruta para registrar la actividad de un usuario
    path('register-user-activity/', views.register_user_activity, name='register_user_activity'),

    # Ruta para obtener la información de la actividad de los usuarios
    path('get-user-info/', views.get_user_info, name='get_user_info'),
     #Incluir las rutas del login
    path('login/', include('core.Login.urls')),  # Aquí incluyes las URLs de Login
    #Incluir las rutas del logout
     path('logout-user-activity/', views.logout_user_activity, name='logout_user_activity'),
   
   
   
    # Ruta para registrar el clic de un botón
   path('register-button-click/', views.register_button_click, name='register_button_click'),



    # Ruta para obtener información sobre los clics registrados
   # path('get-button-info/', views.get_button_info, name='get_button_info'),
    
  
    ]

# Solo en modo DEBUG, para servir archivos de medios
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)