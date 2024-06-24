import React, {useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/CrearGondola.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MapaCompleto from './MapaCompleto.js';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditarGondola() {
    let navigate = useNavigate();
    let { nombre_usuario } = useParams();
    let { id } = useParams();
    let { gondola_id } = useParams();
    const [initialValues, setInitialValues] = useState({
        codigo:"",
        categoria:"",
        largo:1,
        ancho:1,
        ubicacionx:1,
        ubicaciony:1
    })

    useEffect(() => {
        
        // Realizar una solicitud HTTP para obtener los detalles del producto
        axios.get(`http://localhost:3001/gondolas/id/${gondola_id}`)
         .then(response => {
           const gondola = response.data;
           // Establecer los valores iniciales del formulario con los detalles del producto
           setInitialValues({
             ...initialValues,
             codigo: gondola.codigo,
             categoria: gondola.categoria,
             largo: gondola.largo,
             ancho: gondola.ancho,
             ubicacionx: gondola.ubicacionx,
             ubicaciony: gondola.ubicaciony,
           });
         })
         .catch(error => {
           console.error("Error al obtener los detalles de la gondola:", error);
         });
         
      }, []);

    const validationSchema = Yup.object().shape({
        codigo: Yup.string().required("Campo obligatorio"),
        categoria: Yup.string().min(3).max(15).required("Campo obligatorio"),
        largo: Yup.number().min(1).required("Campo obligatorio"),
        ancho: Yup.number().min(1).required("Campo obligatorio"),
        ubicacionx: Yup.number().min(1).required("Campo obligatorio"),
        ubicaciony: Yup.number().min(1).required("Campo obligatorio")
    })
    const editarGondola = async (data) => {
        
        const gondolaData = {
            ...data,
            SupermercadoId: id,
        };
        
        const response = await axios.put(`http://localhost:3001/gondolas/${gondola_id}/editar`, gondolaData);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Góndola editada",
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
        <div className="titulo-gondola">Editar la góndola</div>
        <div className="container">
          {/* Columna izquierda: formulario */}
          <div className="form-container">
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={editarGondola}>
              <Form>
                {/* ... (tus campos de formulario existentes) */}
                <ErrorMessage name="codigo" component="span"></ErrorMessage>
                <Field id="codigo" name="codigo" placeholder="ID de la góndola" type="text" className="inputField" 
                value={initialValues.codigo} onChange={e => setInitialValues({...initialValues, codigo: e.target.value})} />
                
                <ErrorMessage name="categoria" component="span"></ErrorMessage>
                <Field id="categoria" name="categoria" placeholder="Categoria de la góndola" type="text" className="inputField" 
                value={initialValues.categoria} onChange={e => setInitialValues({...initialValues, categoria: e.target.value})}/>
                
                <div><label>Largo de la góndola</label></div>
                <ErrorMessage name="largo" component="span"></ErrorMessage>
                <Field id="largo" name="largo" placeholder="Metros de largo" type="number" className="inputField" 
                value={initialValues.largo} onChange={e => setInitialValues({...initialValues, largo: e.target.value})}/>
                
                <div><label>Ancho de la góndola</label></div>
                <ErrorMessage name="ancho" component="span"></ErrorMessage>
                <Field id="ancho" name="ancho" placeholder="Metros de ancho" type="number" className="inputField" 
                value={initialValues.ancho} onChange={e => setInitialValues({...initialValues, ancho: e.target.value})} />
                
                <div><label>Fila de la góndola:</label></div>
                <ErrorMessage name="ubicaciony" component="span"></ErrorMessage>
                <Field id="ubicaciony" name="ubicaciony" type="number" className="inputField" 
                value={initialValues.ubicaciony} onChange={e => setInitialValues({...initialValues, ubicaciony: e.target.value})}/>
                
                <div><label>Columna de la góndola:</label></div>
                <ErrorMessage name="ubicacionx" component="span"></ErrorMessage>
                <Field id="ubicacionx" name="ubicacionx" type="number" className="inputField" 
                value={initialValues.ubicacionx} onChange={e => setInitialValues({...initialValues, ubicacionx: e.target.value})}/>
                
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

export default EditarGondola