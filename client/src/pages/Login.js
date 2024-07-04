import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Login.css';
import * as Yup from 'yup';
import axiosInstance from '../auth/axiosConfig.js';

function Login() {
  const initialValues = {
    nombre_usuario: "",
    contraseña: ""
  }

  let navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está autenticado

  useEffect(() => {
    // Verificar si el usuario está autenticado (simulación)
    const checkAuthentication = () => {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      // Simular lógica de autenticación basada en el token (puedes ajustar esto según tu implementación real)
      if (token) {
        setIsLoggedIn(true); // El usuario está autenticado
      } else {
        setIsLoggedIn(false); // El usuario no está autenticado
      }
    };
    checkAuthentication(); // Llamar a la función de verificación al montar el componente
  }, []);

  

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("http://localhost:3001/administradores/login", data);
      if (response.data.token) {
        // Almacena el token JWT en el almacenamiento local
        localStorage.setItem("token", response.data.token);
        setLoginError(false);
        setUsername(data.nombre_usuario);
        // Redirige a la página del homeSuper
        navigate(`/app/${data.nombre_usuario}`);
      } else {
        setLoginError(true);
      }
    } catch (error) {
      // Manejo de errores aquí
      console.error(error);
      setLoginError(true);
    }
  }

  const validationSchema = Yup.object().shape({
    nombre_usuario: Yup.string().min(3).max(15).required("Campo obligatorio"),
    contraseña: Yup.string().min(3).max(15).required("Campo obligatorio")
  })

  return (
    <div className='loginAdmin'>
      <div className='loginTitle'>
        Login
      </div>
      {loginError && (
        <div className="error-message">
          Usuario y/o contraseña incorrectos.
        </div>
      )}
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formLogin'>
          
          <ErrorMessage 
            name="nombre_usuario" 
            component="span">
          </ErrorMessage>

          <Field 
            id="inputNombreUsuario" 
            name="nombre_usuario" 
            placeholder="Nombre usuario" 
            className="inputField" 
          />

          <ErrorMessage 
            name="contraseña" 
            component="span">
          </ErrorMessage>

          <Field 
            id="inputContraseña" 
            name="contraseña" 
            placeholder="Contraseña" 
            type="password" 
            className="inputField"
          />
          <button type='submit' className="loginButton">Login</button>
        </Form>
      </Formik>
      <Link to="/register" className="registerLink">
        Register
      </Link>
    </div>
  )
}

export default Login;
