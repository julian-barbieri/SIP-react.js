import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import validationSchemaProducto from '../validations/validationSchemaProducto.js'; 
import SwalAlert from '../componentes/SwalAlert.js';
import axiosInstance from '../auth/axiosConfig.js';
import Title from '../componentes/Title.js';
import Mapa from '../componentes/Mapa.js';
import BackButton from "../componentes/buttons/BackButton.js";
import ubicOptions from "../componentes/ubicOptions.js";
import '../styles/ProductoForm.css';
import CompleteField from '../componentes/CompleteField.js';
import GuardarButton from '../componentes/buttons/GuardarButton.js';

function ProductoForm() {
  let { id, nombre_usuario, producto_id } = useParams();
  let navigate = useNavigate();

  const [listOfGondolas, setListOfGondolas] = useState([]);
  const [gondolas, setGondolas] = useState([]);
  const [cuadrosSeleccionados, setCuadrosSeleccionados] = useState([]);
  const [numAncho, setNumAncho] = useState(10);
  const [numLargo, setNumLargo] = useState(10);  
  const [entradax, setEntradax] = useState(5);
  const [entraday, setEntraday] = useState(5);
  const [salidax, setSalidax] = useState(5);
  const [saliday, setSaliday] = useState(5);
  const [values, setValues] = useState({    
    nombre: "",
    marca: "",
    precioUnidad: 0,
    categoria: "",
    subCategoria: "",
    descuento: 0,
    stock: true,
    GondolaId: " ",
    ubicExacta: " ",
  });


  useEffect(() => {
    axiosInstance.get(`http://localhost:3001/gondolas/${id}`).then((response) => {
      setGondolas(response.data);
      const gondolasOptions = [
        { value: '', label: 'Seleccioná una góndola' }, // Opción inicial
        ...response.data.map((gondola) => ({
          value: gondola.id,
          label: `${gondola.codigo} - ${gondola.categoria}`,
        })),
      ];
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

      //ELIMINAR CUADROS SELECCIONADOS A FUTURO
      const nuevaMatriz = [];
      for (let fila = 0; fila < response.data.largo; fila++) {
        nuevaMatriz.push(new Array(response.data.ancho).fill(0));
      }
      setCuadrosSeleccionados(nuevaMatriz);
    });

    // Si hay un producto_id, cargar los datos del producto para edición
    if (producto_id) {
      axiosInstance.get(`http://localhost:3001/productos/${producto_id}`).then((response) => {
        const producto = response.data;
        setValues({
          nombre: producto.nombre,
          marca: producto.marca,
          categoria: producto.categoria,
          subCategoria: producto.subCategoria,
          precioUnidad: producto.precioUnidad,
          descuento: producto.descuento,
          stock: producto.stock,
          GondolaId: producto.GondolaId,
          ubicExacta: producto.ubicExacta,
        });
      }).catch(error => {
        console.error("Error al obtener los detalles del producto:", error);
      });
    }
  }, [id, producto_id]);

  const onSubmit = async (data) => {
    try {
      const productoData = {
        ...data,
        ubicExacta: data.ubicExacta,
        GondolaId: data.GondolaId,
      };
      
      if (producto_id) {
        // Editar producto
        await axiosInstance.put(`http://localhost:3001/productos/${producto_id}/editar`, productoData);
        SwalAlert('success', 'Producto editado', '');
      } else {
        // Crear nuevo producto
        await axiosInstance.post(`http://localhost:3001/productos`, productoData);
        SwalAlert('success', 'Producto creado', '');
      }

      navigate(`/welcome/${id}/${nombre_usuario}/producto`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <BackButton to={`/welcome/${id}/${nombre_usuario}/producto`} />
      {producto_id ? 
      <Title text={"Editar Producto"} /> : 
      <Title text={"Crear Producto"} />}
      <div>
        <div className="form-mapa-container">
          <div className="formulario">
            <Formik 
            enableReinitialize
            initialValues={values}
            onSubmit={onSubmit} 
            validationSchema={validationSchemaProducto}
            >

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
                <Field
                  as="select"
                  id="ubicExacta"
                  className="inputField"
                  name="ubicExacta"
                  control="select"
                >
                  {ubicOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.key}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="ubicExacta" component="span" className="error-message"/>
                <Field
                  as="select"
                  id="GondolaId"
                  className="inputField"
                  name="GondolaId"
                  control="select"
                >
                  {listOfGondolas.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="GondolaId" component="span" className="error-message"/>
                </div>
                <GuardarButton />
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

export default ProductoForm;