import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import validationSchemaProducto from '../validations/validationSchemaProducto.js'; 
import Select from 'react-select';
import SwalAlert from '../componentes/SwalAlert.js';
import axiosInstance from '../auth/axiosConfig.js';
import Title from '../componentes/Title.js';
import Mapa from '../componentes/Mapa.js';
import BackButton from "../componentes/buttons/BackButton.js";
import ubicOptions from "../componentes/ubicOptions.js";
import '../styles/CrearProducto.css';
import initialValues from '../componentes/initialValues.js';
import CompleteField from '../componentes/CompleteField.js';
import ErrorMsg from '../componentes/ErrorMsg.js';

function CrearProducto() {
  let { id, nombre_usuario } = useParams();
  let navigate = useNavigate();

  const [listOfGondolas, setListOfGondolas] = useState([]);
  const [gondola, setGondola] = useState();
  const [gondolas, setGondolas] = useState([]);
  const [ubicExacta, setUbicExacta] = useState();
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
      const gondolasOptions = response.data.map((gondola) => ({
        value: gondola.id,
        label: `${gondola.categoria}`,
      }));
      setListOfGondolas(gondolasOptions);
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

  const onSubmit = async (data) => {
    try {
      const productoData = {
        ...data,
        ubicExacta: ubicExacta,
        GondolaId: gondola,
      };
      await axiosInstance.post(`http://localhost:3001/productos`, productoData);
      SwalAlert('success', 'Producto creado', '');
      navigate(`/welcome/${id}/${nombre_usuario}/producto`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGondola = (selectedOption) => {
    setGondola(selectedOption.value);
  };

  const handleUbic = (selectedOption) => {
    setUbicExacta(selectedOption.value);
  };

  return (
    <div>
      <BackButton to={`/welcome/${id}/${nombre_usuario}/producto`} />
      <Title text={"Crear Producto"} />
      <div>
        <div className="form-mapa-container">
          <div className="formulario">
            <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit} 
            validationSchema={validationSchemaProducto}>
              <Form>
                <div className="form-group">
                  <div className='row'>
                    <CompleteField text={"Nombre"} id={"nombre"} name={"nombre"} placeholder={"Nombre del producto"} type={"text"} />
                    <CompleteField text={"Marca"} id={"marca"} name={"marca"} placeholder={"Marca del producto"} type={"text"} />
                  </div>
                  <div className='row'>
                    <CompleteField text={"Categoria"} id={"categoria"} name={"categoria"} placeholder={"Categoria del producto"} type={"text"} />
                    <CompleteField text={"Subcategoria"} id={"subCategoria"} name={"subCategoria"} placeholder={"Subcategoria del producto"} type={"text"} />
                  </div>
                  <div className='row'>
                    <CompleteField text={"Precio ($ / kg):"} id={"precioUnidad"} name={"precioUnidad"} placeholder={"Precio del producto"} type={"number"} />
                    <CompleteField text={"Descuento (%):"} id={"descuento"} name={"descuento"} placeholder={"Descuento del producto"} type={"number"} />
                  </div>
                  <div className='row'>
                    <CompleteField text={"Stock:"} id={"stock"} name={"stock"} placeholder={null} type={"checkbox"} />
                  </div>
                </div>
                <div className="form-group">
                  <ErrorMessage name="GondolaId" component="span" />
                  <Select
                    id="GondolaId"
                    className="inputField"
                    name="GondolaId"
                    options={listOfGondolas}
                    onChange={handleGondola}
                    placeholder="Selecciona una góndola"
                  />
                  <ErrorMessage name="ubicExacta" component="span" />
                  <Select
                    id="ubicExacta"
                    className="inputField"
                    name="ubicExacta"
                    placeholder="Selecciona la ubicación exacta"
                    options={ubicOptions}
                    onChange={handleUbic}
                  />
              
                </div>
                <div className='button-container'>
                  <button type="submit" onSubmit={onSubmit} className="guardarButton">
                    Guardar
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          <div className="mapa">
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
    </div>
  );
}

export default CrearProducto;
