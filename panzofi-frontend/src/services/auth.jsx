import {jwtDecode} from 'jwt-decode';
import { message } from 'antd';

// Establecer el token en el localStorage
export const setToken = (token) => {
  if (!token) {
    message.error('Token no válido');
    return;
  }

  try {
    // Guardar el token en el localStorage
    localStorage.setItem('token', token);
    
    // Verificar si el token fue guardado correctamente
    const savedToken = localStorage.getItem('token');
    if (savedToken === token) {
      //console.log('Token guardado con éxito');
    } else {
      message.error('Error al guardar el token');
    }
  } catch (error) {
    message.error('Error al acceder al almacenamiento local');
  }
};
  


// Obtener el token del localStorage
export const getToken = () => {

  
  return localStorage.getItem('token');
};
  
// Eliminar el token del localStorage para logout
export const removeToken = () => {
  localStorage.removeItem('token');
};
  


export const isAuthenticated = () => {
  const token = getToken();

  if (!token) {
    return { isAuthenticated: false, is_staff: null };  // No hay token, no está autenticado
  }

  try {
    const decodedToken = jwtDecode(token);
    //console.log("Token decodificado:", decodedToken);  // Verifica el contenido del token


  // Accede a la propiedad id_user del token decodificado
  const user_id = decodedToken.user_id;  // Aquí obtienes el id_user del token

  //console.log("ID del usuario:", user_id);  // Verifica si estás obteniendo el id_user correctamente

    // Verificar si el token ha expirado
    const currentTime = Date.now() / 1000;  // Obtener el tiempo actual en segundos
    if (decodedToken.exp < currentTime) {
      console.log("El token ha expirado");
      removeToken();  // Eliminar el token si ha expirado
      return { isAuthenticated: false, is_staff: null };  // No está autenticado
    }

    // Verificar si el token tiene el campo 'is_staff'
    if (decodedToken && decodedToken.is_staff !== undefined) {
      return { isAuthenticated: true, is_staff: decodedToken.is_staff,user_id };  // Retorna el rol si está presente
    } else {
      return { isAuthenticated: false, is_staff: null, user_id: null};  // No tiene rol
    }
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return { isAuthenticated: false, is_staff: null, user_id: null };  // Error al decodificar el token
  }
};










  
  

