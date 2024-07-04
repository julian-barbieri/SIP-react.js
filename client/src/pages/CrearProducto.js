import Combobox from "react-widgets/Combobox";
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/CrearProducto.css';
import MapaCompleto from './MapaCompleto.js';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import axiosInstance from '../auth/axiosConfig.js';
import Swal from "sweetalert2";

function CrearProducto() {
  let { id } = useParams();
  let { nombre_usuario } = useParams();
  let navigate = useNavigate();

  const [listOfGondolas, setListOfGondolas] = useState([]);
  const [gondola, setGondola] = useState();
  const [ubicExacta, setUbicExacta] = useState();
  useEffect(() => {
    axiosInstance.get(`http://localhost:3001/gondolas/${id}`).then((response) => {
      
      const gondolasOptions = response.data.map((gondola) => ({
        value: gondola.id, // Debes usar el identificador único de la gondola aquí
        label: `${gondola.categoria}`,
      }));  
      setListOfGondolas(gondolasOptions);
    });
  }, []);

  const initialValues = {
    nombre: "",
    marca: "",
    precioUnidad: 0,
    categoria: "",
    subCategoria: "",
    descuento: 0,
    stock: true,
    GondolaId: " ",
    ubicExacta: " "
  }
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Campo obligatorio"),
    marca: Yup.string().required("Campo obligatorio"),
    categoria: Yup.string().required("Campo obligatorio"),
    subCategoria: Yup.string().required("Campo obligatorio"),
    descuento: Yup.number().min(0).required("Campo obligatorio"),
    precioUnidad: Yup.number().min(0.01).required("Campo obligatorio"),
  })
  const onSubmit = async (data) => {
    try {
        // Verifica si el usuario ya existe
        const productoData = {
          ...data,
          ubicExacta: ubicExacta,
          GondolaId: gondola,
        };
        const response = await axiosInstance.post(`http://localhost:3001/productos`, productoData);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Producto creado",
          showConfirmButton: true,
          timer: 2500
        });
        navigate(`/welcome/${id}/${nombre_usuario}/producto`)
        }
        catch (error) {
          // Manejo de errores aquí
          console.error(error);
        }
    }
  
  const handleGondola = (selectedOption) => {
    setGondola(selectedOption.value);
  };

  const handleUbic = (selectedOption) =>{
    setUbicExacta(selectedOption.value);
  };

  const ubicOptions = [
    { value: 'arriba', label: 'Arriba' },
    { value: 'abajo', label: 'Abajo' },
    { value: 'derecha', label: 'Derecha' },
    { value: 'izquierda', label: 'Izquierda' }
  ]
  return (
    <div className='container-crear-producto'>
      <div className="top-bar">
        <Link to={`/welcome/${id}/${nombre_usuario}/producto`} className="back-link">
          Volver
        </Link>
      </div>
      <h2>Crear Producto</h2>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <div className="form-group">
            <ErrorMessage name="nombre" component="span"></ErrorMessage>
            <Field id="nombre" name="nombre" placeholder="Nombre del producto" type="text" className="inputField" />

            <ErrorMessage name="marca" component="span"></ErrorMessage>
            <Field id="marca" name="marca" placeholder="Marca producto" type="text" className="inputField" />
            
            <ErrorMessage name="categoria" component="span"></ErrorMessage>
            <Field id="categoria" name="categoria" placeholder="Categoria" type="text" className="inputField" />
            
            <ErrorMessage name="subCategoria" component="span"></ErrorMessage>
            <Field id="subCategoria" name="subCategoria" placeholder="Subcategoria" type="text" className="inputField" />
            
            <label>Precio por unidad ($):</label>
            <ErrorMessage name="precioUnidad" component="span"></ErrorMessage>
            <Field id="precioUnidad" name="precioUnidad" placeholder="Precio" type="number" className="inputField" />

            <div><label>Descuento (%):</label></div>
            <ErrorMessage name="descuento" component="span"></ErrorMessage>
            <Field id="descuento" name="descuento" placeholder="Descuento" type="number" className="inputField" />

            <div><label>¿Hay stock?</label></div>
            <Field id="stock" name="stock" type="checkbox" className="inputField" />
            
          </div>
          <div className='button-container'>
            <MapaCompleto />
          </div>
          <div className="form-group">
            <ErrorMessage name="GondolaId" component="span"></ErrorMessage>
            <Select
              id="GondolaId"
              className="inputField"
              name="GondolaId" 
              options={listOfGondolas}
              onChange={handleGondola}// Llama a handleGondola cuando se selecciona un producto
              placeholder="Selecciona una góndola"
            />
            <ErrorMessage name="ubicExacta" component="span"></ErrorMessage>
            <Select
              id="ubicExacta"
              className="inputField"
              name="ubicExacta" 
              placeholder="Selecciona la ubicación exacta"
              options={ubicOptions}
              onChange={handleUbic}
            >
            </Select>
          </div>
          <div className='button-container'>
            <button type="submit" onSubmit={onSubmit} className="guardarButton">
              Guardar
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default CrearProducto
