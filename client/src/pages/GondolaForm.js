import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/GondolaForm.css';
import validationSchemaGondola from '../validations/validationSchemaGondola.js';
import { Formik, Form } from 'formik';
import Mapa from '../componentes/Mapa.js';
import axiosInstance from '../auth/axiosConfig.js';
import SwalAlert from '../componentes/SwalAlert.js';
import BackButton from '../componentes/buttons/BackButton.js';
import CompleteField from '../componentes/CompleteField.js';
import GuardarButton from '../componentes/buttons/GuardarButton.js';
import Title from '../componentes/Title.js';

function GondolaForm() {
    let navigate = useNavigate();
    let { nombre_usuario, id, gondola_id } = useParams();

    const [gondolas, setGondolas] = useState([]);
    const [cuadrosSeleccionados, setCuadrosSeleccionados] = useState([]);
    const [numAncho, setNumAncho] = useState(10);
    const [numLargo, setNumLargo] = useState(10);  
    const [entradax, setEntradax] = useState(5);
    const [entraday, setEntraday] = useState(5);
    const [salidax, setSalidax] = useState(5);
    const [saliday, setSaliday] = useState(5);
    const [values, setValues] = useState({    
      codigo:"",
      categoria:"",
      largo:1,
      ancho:1,
      ubicacionx:1,
      ubicaciony:1
    });

    useEffect(() => {
      axiosInstance.get(`http://localhost:3001/gondolas/${id}`).then((response) => {
        setGondolas(response.data);
      });
      axiosInstance.get(`http://localhost:3001/supermercados/superById/${id}`).then((response) => {
        setNumLargo(response.data.largo);
        setNumAncho(response.data.ancho);
        setEntradax(response.data.entradax);
        setEntraday(response.data.entraday);
        setSalidax(response.data.salidax);
        setSaliday(response.data.saliday);
  
        document.documentElement.style.setProperty('--numAncho', response.data.ancho);
        document.documentElement.style.setProperty('--numLargo', response.data.largo);
  
        //ELIMINAR CUADROS SELECCIONADOS A FUTURO
        const nuevaMatriz = [];
        for (let fila = 0; fila < response.data.largo; fila++) {
          nuevaMatriz.push(new Array(response.data.ancho).fill(0));
        }
        setCuadrosSeleccionados(nuevaMatriz);
      });

      if (gondola_id){
        axiosInstance.get(`http://localhost:3001/gondolas/id/${gondola_id}`).then((response) => {
          const gondola = response.data;
          setValues({
            codigo: gondola.codigo,
            categoria: gondola.categoria,
            largo: gondola.largo,
            ancho: gondola.ancho,
            ubicacionx: gondola.ubicacionx,
            ubicaciony: gondola.ubicaciony,
          });
        }).catch(error => {
          console.error("Error al obtener los detalles de la góndola:", error);
        });
      }
    }, [id, gondola_id]);
  
    const onSubmit = async (data) => {
       
      try{
        const gondolaData = {
          ...data,
          SupermercadoId: id,
        };

        if (gondola_id){
          await axiosInstance.put(`http://localhost:3001/gondolas/${gondola_id}/editar`, gondolaData);
          SwalAlert('success', 'Góndola editada', '');
        } else{
          await axiosInstance.post(`http://localhost:3001/gondolas`, gondolaData);
          SwalAlert('success', 'Góndola creada', '');
        }
        navigate(`/welcome/${id}/${nombre_usuario}/gondolas`);
      } catch (error) {
        SwalAlert('error', 'Error al obtener los detalles de la góndola', '');
        console.error("Error al obtener los detalles de la gondola:", error);
      }
    }
    
    return (
        <div>
          <BackButton to={`/welcome/${id}/${nombre_usuario}/gondolas`}/>
          {gondola_id ? 
            <Title text={"Editar góndola"} /> : 
            <Title text={"Crear góndola"} />}
          <div className="container-gondola">
            {/* Columna izquierda: formulario */}
            <div className="form-container-gondola">
            <Formik 
              enableReinitialize
              initialValues={values} 
              validationSchema={validationSchemaGondola} 
              onSubmit={onSubmit}
            >
              <Form>
                <div className="row">
                  <CompleteField text={"Identificador"} id={"codigo"} name={"codigo"} placeholder={"Nro de ID"} type={"number"}/>
                  <CompleteField text={"Categoría"} id={"categoria"} name={"categoria"} placeholder={"Ej: panaderia"} type={"text"}/>
                </div>
                <div className="row">
                    <div className="column-left">
                      <CompleteField text={"Largo"} id={"largo"} name={"largo"} placeholder={"Metros de largo"} type={"number"}/>
                      <CompleteField text={"Ancho"} id={"ancho"} name={"ancho"} placeholder={"Metros de ancho"} type={"number"}/>
                    </div>
                    <div className="column-right">
                      <CompleteField text={"Fila"} id={"ubicaciony"} name={"ubicaciony"} placeholder={"Fila de la góndola"} type={"number"}/>
                      <CompleteField text={"Columna"} id={"ubicacionx"} name={"ubicacionx"} placeholder={"Columna de la góndola"} type={"number"}/>
                    </div>
                </div>
                <GuardarButton />
              </Form>
            </Formik>

            </div>
    
            {/* Columna derecha: mapa */}
            <div className="map-container">
              <Mapa 
                numLargo={numLargo}
                numAncho={numAncho}
                cuadrosSeleccionados={cuadrosSeleccionados}
                gondolas={gondolas}
                entraday={entraday}
                entradax={entradax}
                saliday={saliday}
                salidax={salidax}
              />
            </div>
          </div>
        </div>
    );
}

export default GondolaForm;
