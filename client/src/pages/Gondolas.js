import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/Gondolas.css'; 
import Swal from 'sweetalert2';
function Gondolas() {
  
  let navigate = useNavigate();
  const [listOfGondolas, setListOfGondolas] = useState([]);

  let { id } = useParams();
  let { nombre_usuario } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3001/gondolas/${id}`).then((response) => {
      setListOfGondolas(response.data);
    });
  }, []);

  const creargondola = async () => {
    navigate(`/welcome/${id}/${nombre_usuario}/gondolas/crear`);
  }

  const editarGondola = async (gondolaId) => {
    navigate(`/welcome/${id}/${nombre_usuario}/gondolas/${gondolaId}`);
  }
  const eliminarGondola = async (gondolaId, categoria) =>{
    Swal.fire({
      title: "Advertencia",
      text: "Eliminar la góndola implica que se eliminarán los productos que se encuentran dentro de ella!",
      icon: "warning",
      showCancelButton: true,
      showCloseButton:true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar góndola",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        try{
          axios.delete(`http://localhost:3001/gondolas/${gondolaId}`);
          // Recargar la lista de gondolas
          Swal.fire({
            title: "Eliminada!",
            text: `La góndola ${gondolaId} de ${categoria} fue eliminada con exito!`,
            icon: "success"
          }).then((result) => {
            if(result.isConfirmed || result.isDismissed){
              window.location.reload();
            }
          })

        } catch(err){
          // Manejo de errores aquí
          console.error(err);
        }
      }
    });

  }
  return (
    <div className='gondolas-container'>
      <div className="top-bar">
        <Link to={`/welcome/${id}/${nombre_usuario}`} className="back-link">
          Volver
        </Link>
      </div>
      <div className='titulo-gondola'>
        Góndolas
      </div>
      <div className='button-container'>
        <button className='button-crear-gondola' onClick={creargondola}>
          Nueva góndola
        </button>
      </div>
      <div className='gondola-list' >
        {listOfGondolas.map((value, key) => (
          <div className="gondola" key={key}>
            <div className="gondola-info">
              <div className="gondola-codigo">{value.codigo}</div>
              <div className="gondola-categoria">{value.categoria}</div>
            </div>
            <div className="gondola-buttons">
              <button className="editar-button" onClick={()=>editarGondola(value.id)}>Editar</button>
              <button className="eliminar-button" onClick={()=>eliminarGondola(value.id, value.categoria)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gondolas;
