// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const ProtectedRoute = ({ children, requiredRole }) => {

  //console.log(requiredRole  )
  const { isAuthenticated: authenticated, is_staff } = isAuthenticated();


  const location = useLocation(); // Obtener la ubicación actual

      

  // Redirige a la página de login si no está autenticado
  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

   // Si el usuario es un admin y la ruta no requiere un rol específico (puede acceder a cualquier página)
  if (is_staff && requiredRole === false) {
    // Si el admin intenta ir a landing, redirigirlo a landing sin problema
    return children;
  }


  // Redirige según el rol del usuario
  if (requiredRole !== undefined && is_staff !== requiredRole) {
    

    return <Navigate to={is_staff ? "/admin" : "/landing"} />;
  }

  // Si cumple con el rol, renderiza la página solicitada
  return children;
};

export default ProtectedRoute;


//si  is_staff es verdadero y required role 



