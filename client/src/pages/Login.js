import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Login.css';
import * as Yup from 'yup';
import axios from 'axios';

function Login() {
  const initialValues = {
    nombre_usuario: "",
    contraseña: ""
  }

  let navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3001/administradores/login", data);
      if (response.data === null) {
        // Usuario y/o contraseña incorrectos
        setLoginError(true);
      } else {
        setLoginError(false);
        // Redirige a la página del homeSuper
        navigate(`/HomeSuper/${data.nombre_usuario}`);
      }
    } catch (error) {
      // Manejo de errores aquí
      console.error(error);
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
          <ErrorMessage name="nombre_usuario" component="span"></ErrorMessage>
          <Field id="inputNombreUsuario" name="nombre_usuario" placeholder="Nombre usuario" className="inputField" />

          <ErrorMessage name="contraseña" component="span"></ErrorMessage>
          <Field id="inputContraseña" name="contraseña" placeholder="Contraseña" type="password" className="inputField" />
          <button type='submit' className="loginButton">Login</button>
        </Form>
      </Formik>
      <Link to="/register" className="registerLink">Register</Link>
    </div>
  )
}

export default Login;
