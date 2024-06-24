import React, {useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/CrearGondola.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MapaCompleto from './MapaCompleto.js';
import axios from 'axios';
import Swal from 'sweetalert2';

function CrearGondola() {
    let navigate = useNavigate();
    let { nombre_usuario } = useParams();
    let { id } = useParams();
    const initialValues = {
        codigo:"",
        categoria:"",
        largo:1,
        ancho:1,
        ubicacionx:1,
        ubicaciony:1
    }
    const validationSchema = Yup.object().shape({
        codigo: Yup.string().required("Campo obligatorio"),
        categoria: Yup.string().min(3).max(15).required("Campo obligatorio"),
        largo: Yup.number().min(1).required("Campo obligatorio"),
        ancho: Yup.number().min(1).required("Campo obligatorio"),
        ubicacionx: Yup.number().min(1).required("Campo obligatorio"),
        ubicaciony: Yup.number().min(1).required("Campo obligatorio")
    })
    const crearGondola = async (data) => {
        
        const gondolaData = {
            ...data,
            SupermercadoId: id,
        };
        
        const response = await axios.post(`http://localhost:3001/gondolas`, gondolaData);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Góndola creada",
          showConfirmButton: true,
          timer: 2500
        });
        navigate(`/welcome/${id}/${nombre_usuario}/gondolas`);
    }
    
    return(
        <div className='container-crear-gondola'>
          <div className="top-bar">
            <Link to={`/welcome/${id}/${nombre_usuario}/gondolas`} className="back-link">
              Volver
            </Link>
          </div>
        <div className="titulo-gondola">Crea la góndola</div>
        <div className="container">
          {/* Columna izquierda: formulario */}
          <div className="form-container">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={crearGondola}>
              <Form>
                {/* ... (tus campos de formulario existentes) */}
                <ErrorMessage name="codigo" component="span"></ErrorMessage>
                <Field id="codigo" name="codigo" placeholder="ID de la góndola" type="text" className="inputField" />
                <ErrorMessage name="categoria" component="span"></ErrorMessage>
                <Field id="categoria" name="categoria" placeholder="Categoria de la góndola" type="text" className="inputField" />
                <div><label>Largo de la góndola</label></div>
                <ErrorMessage name="largo" component="span"></ErrorMessage>
                <Field id="largo" name="largo" placeholder="Metros de largo" type="number" className="inputField" />
                <div><label>Ancho de la góndola</label></div>
                <ErrorMessage name="ancho" component="span"></ErrorMessage>
                <Field id="ancho" name="ancho" placeholder="Metros de ancho" type="number" className="inputField" />
                
                <div><label>Fila de la góndola:</label></div>
                <ErrorMessage name="ubicaciony" component="span"></ErrorMessage>
                <Field id="ubicaciony" name="ubicaciony" type="number" className="inputField" />
                
                <div><label>Columna de la góndola:</label></div>
                <ErrorMessage name="ubicacionx" component="span"></ErrorMessage>
                <Field id="ubicacionx" name="ubicacionx" type="number" className="inputField" />
                <div className='button-container'>
                  <button type="submit" className="guardarButton">
                    Guardar
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
  
          {/* Columna derecha: mapa */}
          <div className="map-container">
            <MapaCompleto />
          </div>
        </div>
      </div>
    )
}

export default CrearGondola