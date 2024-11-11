// src/pages/LandingPage.js
import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../services/auth';
import LogoutButton from '../components/logoutButton';
import useLandingPageInfo from '../hooks/landingPageInf';  // Corrección de la ruta de importación
import { registerButtonClick } from '../services/api';
import Timer from '../components/timer';

const LandingPage = () => {
  const { data, loading, error } = useLandingPageInfo();
  const [authStatus, setAuthStatus] = useState(null);

  const handleButtonClick = async (button_name) => {
    const authStatus = isAuthenticated();

    // Verificar si el usuario está autenticado antes de intentar acceder al id_user
    if (!authStatus.isAuthenticated) {
      console.error('Usuario no autenticado');
      return; // Salir de la función si no está autenticado
    }

    const user_id = authStatus.user_id;

    try {
      // Llamar a la función del servicio API para registrar el clic
      await registerButtonClick(user_id, button_name);  // Enviar el id_user y buttonName a la API
    } catch (error) {
      console.error('Error registering button click:', error);
    }
  };

  // Renderizar según el estado de carga o error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading landing page info</p>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>{data?.title || 'Welcome to the Landing Page'}</h1>
      {data?.logo && <img src={`http://127.0.0.1:8000${data.logo}`} alt="Logo" style={{ maxWidth: '500px' }} />}
      <p>{data?.description}</p>
      <Timer />
      {authStatus && <p>{authStatus}</p>}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => handleButtonClick('button_1')}>Botón 1</button>
        <button onClick={() => handleButtonClick('button_2')}>Botón 2</button>
      </div>

      <LogoutButton />
    </div>
  );
};

export default LandingPage;
