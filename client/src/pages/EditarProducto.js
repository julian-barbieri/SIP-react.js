import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/CrearProducto.css';
import MapaCompleto from './MapaCompleto.js';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditarProducto() {
    
  let { id } = useParams();
  let { producto_id } = useParams();
  let { nombre_usuario } = useParams();
  let navigate = useNavigate();

  const [listOfGondolas, setListOfGondolas] = useState([]);
  const [listOfUbicaciones, setListOfUbicaciones] = useState([]);
  const [gondola, setGondola] = useState();
  const [gondolaSelect, setGondolaSelect] = useState({});
  const [ubicExacta, setUbicExacta] = useState();
  const [initialValues, setInitialValues] = useState({
    id: producto_id,
    nombre: "",
    marca: "",
    precioUnidad: 0,
    categoria: "",
    subCategoria: "",
    descuento: 0,
    stock: true,
    GondolaId: "",
    ubicExacta: "",
  });

  useEffect(() => {

    // Realizar una solicitud HTTP para obtener los detalles del producto
    axios.get(`http://localhost:3001/productos/${producto_id}`)
     .then(response => {
       //console.log(response.data);
       const producto = response.data;
       // Establecer los valores iniciales del formulario con los detalles del producto
       setInitialValues({
         ...initialValues,
         nombre: producto.nombre,
         marca: producto.marca,
         precioUnidad: producto.precioUnidad,
         categoria: producto.categoria,
         subCategoria: producto.subCategoria,
         descuento: producto.descuento,
         stock: producto.stock,
         GondolaId: producto.GondolaId,
         ubicExacta: producto.ubicExacta
       });
        // Realizar una solicitud HTTP para obtener la góndola by ID
        axios.get(`http://localhost:3001/gondolas/id/${initialValues.GondolaId}`).then((response) => {
            const gondola_select = response.data;
            setGondolaSelect({
                id: gondola_select.id,
                codigo: gondola_select.codigo,
                categoria: gondolaSelect.categoria,
                largo: gondolaSelect.largo,
                ancho: gondolaSelect.ancho,
                ubicacionx: gondolaSelect.ubicacionx,
                ubicaciony: gondolaSelect.ubicaciony,
                SupermercadoId: gondolaSelect.SupermercadoId
            });
        });
     })
     .catch(error => {
       console.error("Error al obtener los detalles del producto:", error);
     });

    // Realizar una solicitud HTTP para obtener la lista de góndolas
    axios.get(`http://localhost:3001/gondolas/${id}`).then((response) => {
      const gondolasOptions = response.data.map((gondola) => ({
        value: gondola.id, // Debes usar el identificador único de la gondola aquí
        key: `${gondola.categoria}`,
      }));  
      setListOfGondolas(gondolasOptions);
    });

  }, []);

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Campo obligatorio"),
    marca: Yup.string().required("Campo obligatorio"),
    categoria: Yup.string().required("Campo obligatorio"),
    subCategoria: Yup.string().required("Campo obligatorio"),
    descuento: Yup.number().min(0).required("Campo obligatorio"),
    precioUnidad: Yup.number().min(0.01).required("Campo obligatorio"),
    ubicExacta: Yup.string().required("Campo obligatorio"),
    GondolaId: Yup.string().required("Campo obligatorio"),
  })
  const onSubmit = async (data) => {
    console.log(data);
    try {
        // pasa la data del producto
        const productoData = {
          ...data,
          ubicExacta: data.ubicExacta,
          GondolaId: data.GondolaId,
        };
        const response = await axios.put(`http://localhost:3001/productos/${producto_id}/editar`, productoData);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Producto editado",
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

  const ubicOptions = [
    { value: '', key: 'Seleccioná la ubicación exacta'},
    { value: 'arriba', key: 'Arriba' },
    { value: 'abajo', key: 'Abajo' },
    { value: 'derecha', key: 'Derecha' },
    { value: 'izquierda', key: 'Izquierda' }
  ]
 
  return (
    <div className='container-crear-producto'>
      <div className="top-bar">
        <Link to={`/welcome/${id}/${nombre_usuario}/producto`} className="back-link">
          Volver
        </Link>
      </div>
      <h2>Editar Producto</h2>
      <Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <div className="form-group">
            <ErrorMessage name="nombre" component="span"></ErrorMessage>
            <Field id="nombre" name="nombre" placeholder="Nombre del producto" type="text" className="inputField" 
            value={initialValues.nombre} onChange={e => setInitialValues({...initialValues, nombre: e.target.value})}/>
            
            <ErrorMessage name="marca" component="span"></ErrorMessage>
            <Field id="marca" name="marca" placeholder="Marca producto" type="text" className="inputField" 
            value={initialValues.marca} onChange={e => setInitialValues({...initialValues, marca: e.target.value})}/>
            
            <ErrorMessage name="categoria" component="span"></ErrorMessage>
            <Field id="categoria" name="categoria" placeholder="Categoria" type="text" className="inputField" 
            value={initialValues.categoria} onChange={e => setInitialValues({...initialValues, categoria: e.target.value})}/>
            
            <ErrorMessage name="subCategoria" component="span"></ErrorMessage>
            <Field id="subCategoria" name="subCategoria" placeholder="Subcategoria" type="text" className="inputField" 
            value={initialValues.subCategoria} onChange={e => setInitialValues({...initialValues, subCategoria: e.target.value})}/>
            
            <label>Precio por unidad ($):</label>
            <ErrorMessage name="precioUnidad" component="span"></ErrorMessage>
            <Field id="precioUnidad" name="precioUnidad" placeholder="Precio" type="number" className="inputField" 
            value={initialValues.precioUnidad} onChange={e => setInitialValues({...initialValues, precioUnidad: e.target.value})}/>
            

            <div><label>Descuento (%):</label></div>
            <ErrorMessage name="descuento" component="span"></ErrorMessage>
            <Field id="descuento" name="descuento" placeholder="Descuento" type="number" className="inputField" 
            value={initialValues.descuento} onChange={e => setInitialValues({...initialValues, descuento: e.target.value})}/>
            
          </div>
            <div><label>¿Hay stock? {initialValues.stock}</label></div>
            <Field id="stock" name="stock" type="checkbox" className="inputField" 
            value={initialValues.stock} checked={initialValues.stock} 
            onChange={e => setInitialValues({...initialValues, stock: e.target.checked})} />
            
          <div className='button-container'>
            <MapaCompleto />
          </div>
          <div className="form-group">
            <ErrorMessage name="GondolaId" component="span"></ErrorMessage>
            <Field
              as="select"
              id="GondolaId"
              className="inputField"
              name="GondolaId"
              control="select"
              //placeholder={"Seleccioná la góndola"}
              //defaultValue="Carnes"
              //options={listOfGondolas}
              //onChange={handleGondola}// Llama  a handleContinue cuando se selecciona un supermercado
            >
            {
                listOfGondolas.map(option => {
                    return(
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    )
                })
            }
            </Field>
            <ErrorMessage name="ubicExacta" component="span"></ErrorMessage>
            <Field
              as="select"
              id="ubicExacta"
              className="inputField"
              name="ubicExacta"
              control="select"
            >
                {
                ubicOptions.map(option => {
                    return(
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    )
                })
                }
            </Field>
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
export default EditarProducto
