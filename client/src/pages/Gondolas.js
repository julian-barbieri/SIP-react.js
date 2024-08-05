import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Gondolas.css'; 
import Swal from 'sweetalert2';
import axiosInstance from '../auth/axiosConfig.js';
import BackButton from '../componentes/buttons/BackButton.js';
import Title from '../componentes/Title.js';
import Button from '../componentes/buttons/Button.js';
import Searcher from '../componentes/Searcher.js';


function Gondolas() {
  
  let navigate = useNavigate();
  const [listOfGondolas, setListOfGondolas] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  let { id } = useParams();
  let { nombre_usuario } = useParams();
  useEffect(() => {
    axiosInstance.get(`http://localhost:3001/gondolas/${id}`).then((response) => {
      setListOfGondolas(response.data);
    });
  }, []);

  const nuevaGondola = () => {
    navigate(`/welcome/${id}/${nombre_usuario}/gondolas/crear`);
  }

  // Filtrar productos basados en la búsqueda por categoria
  const gondolasFiltrados = listOfGondolas.filter((gondola) =>
    gondola.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  const editarGondola = async (gondolaId) => {
    navigate(`/welcome/${id}/${nombre_usuario}/gondolas/${gondolaId}`);
  }
  const eliminarGondola = async (gondolaId, categoria, codigo) =>{
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
            text: `La góndola ${codigo} de ${categoria} fue eliminada con exito!`,
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
      <div className="button-container">
        <Button onClick={nuevaGondola} text={"Nueva góndola"} className="primary" />
      </div>
      <div className='buscar-container'>
        <Searcher busqueda={busqueda} setBusqueda={setBusqueda} placeholder={"Buscar por categoria"} />
      </div>
      <div className='gondola-list'>
        {gondolasFiltrados.map((value, key) => (
          <div className="gondola" key={key}>
            <div className="gondola-info">
              <div className="gondola-codigo">{value.codigo}</div>
              <div className="gondola-categoria">{value.categoria}</div>
            </div>
            <div className="gondola-buttons">
              <Button className="secondary" text="Editar" onClick={() => editarGondola(value.id)} />
              <Button className="danger" text="Eliminar" onClick={() => eliminarGondola(value.id, value.categoria, value.codigo)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gondolas;
