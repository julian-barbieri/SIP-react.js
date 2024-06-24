import React, {useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/CreateSuper.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateSuper() {

  let { nombre_usuario } = useParams();
  const [admin, setAdmin] = useState({});
  let navigate = useNavigate();
  const initialValues = {
    nombre:"",
    direccion:"",
    largo:10,
    ancho:10,
    entradax:5,
    entraday:1,
    salidax:6,
    saliday:1,
}

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Campo obligatorio"),
    direccion: Yup.string().min(3).max(30).required("Campo obligatorio"),
    largo: Yup.number().min(1).required("Campo obligatorio"),
    ancho: Yup.number().min(1).required("Campo obligatorio"),
    entradax: Yup.number().min(0).required("Campo obligatorio"),
    entraday: Yup.number().min(0).required("Campo obligatorio"),
    salidax: Yup.number().min(0).required("Campo obligatorio"),
    saliday: Yup.number().min(0).required("Campo obligatorio"),
  })

  const crearSuper = async (data) => {
    // Obtener el ID del administrador
    const adminResponse = await axios.get(`http://localhost:3001/administradores/adminByUsername/${nombre_usuario}`);
    const adminId = adminResponse.data.id;

    const supermercadoData = {
      ...data,
      AdministradoreId: adminId,
    };
    const response = await axios.post(`http://localhost:3001/supermercados`, supermercadoData);
    
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Supermercado creado",
      showConfirmButton: true,
      timer: 2500
    });
    // Navegar a donde desees después de crear el supermercado
    navigate(`/homeSuper/${nombre_usuario}`);

  }
  return (
    <div>
      <div className="top-bar">
        <Link to={`/homeSuper/${nombre_usuario}`} className="back-link">
          Volver
        </Link>
      </div>
      <h2>Crear Supermercado</h2>
      
      <Formik initialValues={initialValues} onSubmit={crearSuper} validationSchema={validationSchema}>
        <Form>
          <div className="form-group">
            <ErrorMessage name="nombre" component="span"></ErrorMessage>
            <Field id="nombre" name="nombre" placeholder="Nombre del supermercado" type="text" className="inputField" />
            <ErrorMessage name="direccion" component="span"></ErrorMessage>
            <Field id="direccion" name="direccion" placeholder="Dirección del supermercado" type="text" className="inputField" />
            <div><label>Largo</label></div>
            <ErrorMessage name="largo" component="span"></ErrorMessage>
            <Field id="largo" name="largo" placeholder="Metros de largo" type="number" className="inputField" />
            <div><label>Ancho</label></div>
            <ErrorMessage name="ancho" component="span"></ErrorMessage>
            <Field id="ancho" name="ancho" placeholder="Metros de ancho" type="number" className="inputField" />
            <div><label>Entrada X</label></div>
            <ErrorMessage name="entradax" component="span"></ErrorMessage>
            <Field id="entradax" name="entradax" type="number" className="inputField" />
            <div><label>Entrada Y</label></div>
            <ErrorMessage name="entraday" component="span"></ErrorMessage>
            <Field id="entraday" name="entraday" type="number" className="inputField" />
            <div><label>Salida X</label></div>
            <ErrorMessage name="salidax" component="span"></ErrorMessage>
            <Field id="salidax" name="salidax" type="number" className="inputField" />
            <div><label>Salida Y</label></div>
            <ErrorMessage name="saliday" component="span"></ErrorMessage>
            <Field id="saliday" name="saliday" type="number" className="inputField" />
            <div className='button-container'>
              <button type='submit' className="guardarButton">Guardar</button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}


export default CreateSuper;
