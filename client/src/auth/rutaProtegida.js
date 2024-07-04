// src/auth/RutaProtegida.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RutaProtegida({ children }) {
  let navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      // Si no hay token, redirige a la página de login
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? children : null;
}

export default RutaProtegida;
