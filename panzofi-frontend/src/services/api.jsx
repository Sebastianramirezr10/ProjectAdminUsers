// src/services/api.js
import axios from 'axios';


// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',  // Base URL de tu API en Django
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para registrar la actividad del usuario (inicio de sesión)
export const registerUserActivity = async (userId) => {
  try {
    const response = await api.post('register-user-activity/', {
      user_id: userId,
    });
    //console.log('Actividad registrada:', response.data.message);
  } catch (error) {
    console.error('Error al registrar la actividad del usuario:', error);
  }
};

// Obtener información de la landing page
export const getLandingPageInfo = async () => {
  try {
    const response = await api.get('landing-page-info/');
    return response.data;
  } catch (error) {
    console.error('Error fetching landing page info', error);
    throw error;
  }
};


//obtener informacion de usuario
export const getUserActivity = async () => {
  try {
    const response = await api.get('get-user-info/');
    const decoded = response.data
    console.log(decoded)
    return response.data;  // Devolvemos los datos de la respuesta (la lista de actividades de usuario)
  } catch (error) {
    console.error('Error al obtener la actividad del usuario:', error.message);
    throw new Error('Failed to fetch user activity');
  }
};


// Registrar actividad del clic de un botón
export const registerButtonClick = async (user_id, button_name) => {
  try {
    // Enviar la información del clic al backend
    const response = await api.post('/register-button-click/', {
      user_id: user_id,
      button_name: button_name,
    });
    //console.log(response.data.message); // Ver mensaje de éxito desde el backend
  } catch (error) {
    console.error('Error registering button click:', error.response || error);
    throw error;
  }
};

// Función para hacer login
export const loginUser = async (username, password) => {
  try {
    const response = await api.post('login/', { username, password });
    return response.data;
  } catch (error) {
    //console.error('Login failed', error);
    throw error;
  }
};

// Función para registrar la actividad del cierre de sesión
export const logoutUserActivity = async (user_id) => {


  try {
    const response = await api.post('logout-user-activity/',
      { user_id: user_id },

    );
   // console.log("sesion finalizada", user_id)
    return response.data; // Respuesta con los detalles del cierre de sesión
  } catch (error) {
    console.error('Error al registrar la actividad de cierre de sesión:', error);
    throw error;
  }
};
