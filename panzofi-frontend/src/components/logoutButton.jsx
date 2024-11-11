// src/components/LogoutButton.js
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../services/auth'; // Función para eliminar el token
import { logoutUserActivity } from '../services/api'; // Función para registrar el cierre de sesión


const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const authStatus = isAuthenticated();
    try {
      // Llamar a la API para registrar la actividad de cierre de sesión
      await logoutUserActivity(authStatus.user_id);

      // Eliminar el token y redirigir a la página de login
      removeToken();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <Button 
      onClick={handleLogout} 
      type="primary" 
      style={{
        position: 'absolute',
        top: '20px', // Asegúrate de ajustar esto si es necesario
        right: '20px', // Posiciona el botón en la esquina superior derecha
        zIndex: 1000, // Asegura que el botón esté por encima de otros elementos
      }}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
