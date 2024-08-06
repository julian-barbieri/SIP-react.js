import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosConfig.js';
import '../styles/MapaCompleto.css';
import BackButton from "../componentes/buttons/BackButton.js";
import Title from '../componentes/Title.js';
import ListaGondolas from '../componentes/ListaGondolas';
import Mapa from '../componentes/Mapa';
import MapTitles from '../componentes/MapTitles';
import Button from '../componentes/buttons/Button';
import Swal from 'sweetalert2';
import SwalAlert from '../componentes/SwalAlert.js';
import { AiOutlineDelete } from "react-icons/ai";

function MapaCompleto() {
  const { id, nombre_usuario } = useParams();
  const [cuadrosSeleccionados, setCuadrosSeleccionados] = useState([]);
  const [gondolas, setGondolas] = useState([]);
  const [entraday, setEntraday] = useState(5);
  const [entradax, setEntradax] = useState(5);
  const [saliday, setSaliday] = useState(5);
  const [salidax, setSalidax] = useState(5);
  const [numAncho, setNumAncho] = useState(11);
  const [numLargo, setNumLargo] = useState(11);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  let navigate = useNavigate();

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
      setNombre(response.data.nombre);
      setDireccion(response.data.direccion);

      document.documentElement.style.setProperty('--numAncho', response.data.ancho);
      document.documentElement.style.setProperty('--numLargo', response.data.largo);

      const nuevaMatriz = [];
      for (let fila = 0; fila < response.data.largo; fila++) {
        nuevaMatriz.push(new Array(response.data.ancho).fill(0));
      }
      setCuadrosSeleccionados(nuevaMatriz);
    });
  }, [id]);

  const eliminarSupermercado = async (supermercadoId, nombre, direccion) =>{
    Swal.fire({
      title: "Advertencia",
      text: "Eliminar el supermercado implica que no se volverá a recuperar su información.",
      icon: "warning",
      showCancelButton: true,
      showCloseButton:true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar supermercado",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        try{
          axiosInstance.delete(`http://localhost:3001/supermercados/${supermercadoId}`);
          SwalAlert('success', 'Eliminada!', `El supermercado ${nombre} ${direccion} fue eliminado con exito!`);
          // Recargar la lista de gondolas
          navigate(`/app/${nombre_usuario}`);

        } catch(err){
          // Manejo de errores aquí
          SwalAlert('error', 'Supermercado no eliminado', '');
          console.error(err);
        }
      }
    });

  }

  return (
    <div>
      <BackButton to={`/welcome/${id}/${nombre_usuario}`} />
      <Title text={"Mapa del Supermercado"} />

      <div className="mapa-completo-container">
        <div className="mapa-container">
          <MapTitles />
          <Mapa
            numLargo={numLargo}
            numAncho={numAncho}
            gondolas={gondolas}
            entraday={entraday}
            entradax={entradax}
            saliday={saliday}
            salidax={salidax}
          />
          <div className='delete-button-container'>
            <Button 
              onClick={() => eliminarSupermercado(id, nombre, direccion)} 
              text={<AiOutlineDelete size={22}/>} 
              className="danger" 
            />
          </div>
        </div>
        
        <div className="lista-gondolas-container">
          <ListaGondolas gondolas={gondolas} />
        </div>
      </div>
    </div>
  );
}

export default MapaCompleto;
