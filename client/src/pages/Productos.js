import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Productos.css';
import axiosInstance from '../auth/axiosConfig.js';
import SwalAlert from '../componentes/SwalAlert.js';
import BackButton from '../componentes/buttons/BackButton.js';
import Title from '../componentes/Title.js';
import Button from '../componentes/buttons/Button.js';
import Searcher from '../componentes/Searcher.js';
import { AiOutlineDelete } from "react-icons/ai";
import Swal from 'sweetalert2';
import { FaBan, FaClipboardCheck  } from "react-icons/fa";

function Productos() {

  const [listOfProductos, setListOfProductos] = useState([]);
  const [gondola, setGondola] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  let { id } = useParams();
  let { nombre_usuario } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    axiosInstance.get(`http://localhost:3001/productos/bySuper/${id}`).then((response) => {
      setListOfProductos(response.data);
    });
    axiosInstance.get(`http://localhost:3001/gondolas/${id}`).then((response) => {
      if(response.data.length > 0) {
        setGondola(true);
      }
    });
  }, []);
  
  // Filtrar productos basados en la búsqueda
  const productosFiltrados = listOfProductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    producto.marca.toLowerCase().includes(busqueda.toLowerCase()) || 
    producto.categoria.toLowerCase().includes(busqueda.toLowerCase()) || 
    producto.subCategoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const nuevoProducto = () => {
    navigate(`/welcome/${id}/${nombre_usuario}/producto/form`)
  }
  const eliminarStock = async (producto_id) => {
    try {
      await axiosInstance.put(`http://localhost:3001/productos/${producto_id}/eliminarstock`);
      // Recargar la lista de productos
      const response = await axiosInstance.get(`http://localhost:3001/productos/bySuper/${id}`);
      setListOfProductos(response.data);
      SwalAlert("success", "Producto eliminado del stock", "")
    } catch (error) {
      console.error("Error al actualizar el stock del producto:", error);
      // Manejar errores aquí
    }
  };

  const añadirProducto = async (producto_id) => {
    try {
      await axiosInstance.put(`http://localhost:3001/productos/${producto_id}/agregarstock`);
      // Recargar la lista de productos
      const response = await axios.get(`http://localhost:3001/productos/bySuper/${id}`);
      setListOfProductos(response.data);
      SwalAlert("success", "Producto añadido al stock", "")
    } catch (error) {
      console.error("Error al actualizar el stock del producto:", error);
      // Manejar errores aquí
    }
  };
  const editarProducto = async (producto_id) => {
    navigate(`/welcome/${id}/${nombre_usuario}/producto/${producto_id}`);
  };

  const eliminarProducto = async (productoId, nombre, marca) =>{
    Swal.fire({
      title: "Advertencia",
      text: "Eliminar el producto implica que no se volverá a recuperar su información.",
      icon: "warning",
      showCancelButton: true,
      showCloseButton:true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar producto",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        try{
          axiosInstance.delete(`http://localhost:3001/productos/${productoId}`);
          SwalAlert('success', 'Eliminada!', `El producto ${nombre} de marca ${marca} fue eliminado con exito!`);
          // Recargar la lista de gondolas
          window.location.reload();

        } catch(err){
          // Manejo de errores aquí
          SwalAlert('error', 'Producto no eliminado', '');
          console.error(err);
        }
      }
    });

  }
  return (
    <div>
      <BackButton to={`/welcome/${id}/${nombre_usuario}`}/>
      <Title text={"Productos"} />
      {gondola ? 
        <><div className='button-container'>
          <Button className="primary" text={"Nuevo producto"} onClick={nuevoProducto} />
        </div>
      <div className='buscar-container'>
        <Searcher busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por nombre, marca, categoría, subcategoría"}/>
      </div>
      <div className='producto-list'>
        {productosFiltrados.map((value, key) => (
          <div className="producto" onClick={() => editarProducto(value.id)} key={key}>
            <div className="producto-info">
              <div className="producto-nombre">{value.nombre}</div>
              <div className="producto-marca">{value.marca}</div>
              <div className="producto-categoria">{value.categoria}</div>
              <div className={`producto-precioUnidad ${value.descuento > 0 ? 'precio-tachado' : ''}`}>
                Precio x Unidad: $ {value.precioUnidad}
              </div>
              {value.descuento > 0 && (
                <div className="producto-conDescuento">
                  Descuento: $ {(value.precioUnidad * (1 - value.descuento / 100)).toFixed(2)} (-{value.descuento}%)
                </div>
              )}
              
              {value.stock==false && (
                <div className="producto-sinStock">
                  ¡Sin stock!
                </div>
              )}
            </div>
            <div className="producto-buttons" onClick={(e) => e.stopPropagation()}>
              <div className='row-button'>
                <Button 
                  onClick={() => añadirProducto(value.id)} 
                  text={<FaClipboardCheck  size={22}/>} 
                  className="secondary" 
                />
              </div>
              <div className='row-button'>
                <Button 
                  onClick={() => eliminarStock(value.id)} 
                  text={<FaBan size={22}/>} 
                  className="warning" 
                />
              </div>
              <div className='row-button'>
                <Button 
                  onClick={() => eliminarProducto(value.id, value.nombre, value.marca)} 
                  text={<AiOutlineDelete size={22}/>} 
                  className="danger" 
                />
              </div>
            </div>
          </div>
        ))}
      </div></> : 
        <div className='crear-producto-label'>
          <p>Creá al menos una góndola para crear productos.</p>
        </div>
        }
      
    </div>
  )
}

export default Productos