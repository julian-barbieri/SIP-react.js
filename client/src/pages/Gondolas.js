import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Gondolas.css'; 
import Swal from 'sweetalert2';
import axiosInstance from '../auth/axiosConfig.js';
import BackButton from '../componentes/buttons/BackButton.js';
import Title from '../componentes/Title.js';
import Button from '../componentes/buttons/ButtonWithLogo.js';

function Gondolas() {
  
  let navigate = useNavigate();
  const [listOfGondolas, setListOfGondolas] = useState([]);

  let { id } = useParams();
  let { nombre_usuario } = useParams();
  useEffect(() => {
    axiosInstance.get(`http://localhost:3001/gondolas/${id}`).then((response) => {
      setListOfGondolas(response.data);
    });
  }, []);


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
          axiosInstance.delete(`http://localhost:3001/gondolas/${gondolaId}`);
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
    <div>
      <BackButton to={`/welcome/${id}/${nombre_usuario}`}/>
      <Title text={"Góndolas"} />
      <Button  to={`welcome/${id}/${nombre_usuario}/gondolas/crear`} text={"Nueva góndola"} logo={null} />
      
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
