import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CrearGondola.css';
import validationSchemaGondola from '../validations/validationSchemaGondola.js';
import { Formik, Form } from 'formik';
import Mapa from '../componentes/Mapa.js';
import axiosInstance from '../auth/axiosConfig.js';
import SwalAlert from '../componentes/SwalAlert.js';
import BackButton from '../componentes/buttons/BackButton.js';
import initialValuesGondola from '../initialValues/initialValuesGondola.js';
import CompleteField from '../componentes/CompleteField.js';
import GuardarButton from '../componentes/GuardarButton.js';

function CrearGondola() {
    let navigate = useNavigate();
    let { nombre_usuario, id } = useParams();
    const [gondolas, setGondolas] = useState([]);
    const [cuadrosSeleccionados, setCuadrosSeleccionados] = useState([]);
    const [numAncho, setNumAncho] = useState(10);
    const [numLargo, setNumLargo] = useState(10);  
    const [entradax, setEntradax] = useState(5);
    const [entraday, setEntraday] = useState(5);
    const [salidax, setSalidax] = useState(5);
    const [saliday, setSaliday] = useState(5);

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
  
        const nuevaMatriz = [];
        for (let fila = 0; fila < response.data.largo; fila++) {
          nuevaMatriz.push(new Array(response.data.ancho).fill(0));
        }
        setCuadrosSeleccionados(nuevaMatriz);
      });
    }, [id]);
  
    const crearGondola = async (data) => {
        
        const gondolaData = {
            ...data,
            SupermercadoId: id,
        };
        
        await axiosInstance.post(`http://localhost:3001/gondolas`, gondolaData);
        SwalAlert('success', 'Góndola creada', '');
        navigate(`/welcome/${id}/${nombre_usuario}/gondolas`);
    }
    
    return (
        <div>
          <BackButton to={`/welcome/${id}/${nombre_usuario}/gondolas`}/>
          <div className="titulo-gondola">Crea la góndola</div>
          <div className="container-gondola">
            {/* Columna izquierda: formulario */}
            <div className="form-container-gondola">
            <Formik initialValues={initialValuesGondola} validationSchema={validationSchemaGondola} onSubmit={crearGondola}>
              <Form>
                <div className="row">
                  <CompleteField text={null} id={"codigo"} name={"codigo"} placeholder={"ID de la góndola"} type={"number"}/>
                  <CompleteField text={null} id={"categoria"} name={"categoria"} placeholder={"Categoria de la góndola"} type={"text"}/>
                </div>
                <div className="column">
                  <div className="row">
                    <div className="column-left">
                      <CompleteField text={"Largo de la góndola"} id={"largo"} name={"largo"} placeholder={"Metros de largo"} type={"number"}/>
                      <CompleteField text={"Ancho de la góndola"} id={"ancho"} name={"ancho"} placeholder={"Metros de ancho"} type={"number"}/>
                    </div>
                    <div className="column-right">
                      <CompleteField text={"Fila"} id={"ubicaciony"} name={"ubicaciony"} placeholder={"Fila de la góndola"} type={"number"}/>
                      <CompleteField text={"Columna"} id={"ubicacionx"} name={"ubicacionx"} placeholder={"Columna de la góndola"} type={"number"}/>
                    </div>
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

export default CrearGondola;
