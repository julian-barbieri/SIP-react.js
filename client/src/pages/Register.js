import React, {useState} from 'react';
import { Link, RedirectFunction } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../styles/Register.css';
import * as Yup from 'yup';
import axios from 'axios';

function Register() {
  const [usuarioExiste, setUsuarioExiste] = useState(false);
    const initialValues = {
        nombre_completo:"",
        nombre_usuario:"",
        contraseña:""
    }
    
    const onSubmit = async (data) => {
      try {
        // Verifica si el usuario ya existe
        console.log(data.nombre_usuario);
        const response = await axios.get(`http://localhost:3001/administradores/adminByUsername/${data.nombre_usuario}`, data);
        console.log(response);
        if (response.data !== null) {
          // Usuario existe, establece usuarioExiste en true
          setUsuarioExiste(true);
        } else {
          setUsuarioExiste(false);
          // Usuario no existe, procede con el registro
          await axios.post("http://localhost:3001/administradores", data);
          // Redirige a la página de inicio de sesión
          window.location.replace('/login');
        } }
        catch (error) {
          // Manejo de errores aquí
          console.error(error);
        }
    }
  

    const validationSchema = Yup.object().shape({
        nombre_completo: Yup.string().required("Campo obligatorio"),
        nombre_usuario: Yup.string().min(3).max(15).required("Campo obligatorio"),
        contraseña: Yup.string().min(3).max(15).required("Campo obligatorio")
    })
    return (
    <div className='registrarAdmin'>
      <div className='registrarTitle'>
        Registrarse
      </div>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='formRegistrarse'>
        {usuarioExiste && (
          <div className="error-message">
            El usuario ya existe. Por favor, elija otro nombre de usuario.
          </div>
        )}
          <ErrorMessage name="nombre_completo" component="span"></ErrorMessage>
          <Field id="inputNombreCompleto" name="nombre_completo" placeholder="Nombre completo" className="inputField" />
          
          <ErrorMessage name="nombre_usuario" component="span"></ErrorMessage>
          <Field id="inputNombreUsuario" name="nombre_usuario" placeholder="Nombre usuario" className="inputField" />
          
          <ErrorMessage name="contraseña" component="span"></ErrorMessage>
          <Field id="inputContraseña" name="contraseña" placeholder="Contraseña" type="password" className="inputField" />
          
          <button type='submit' className="registerButton">Registrarse</button>
        </Form>
      </Formik>
      <Link to="/login" className="loginLink">Login</Link>
    </div>
  )
}

export default Register;
