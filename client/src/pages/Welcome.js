import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Welcome.css'; // Importa un archivo de estilos para Welcome

function Welcome() {
  const [supermercado, setSupermercado] = useState({});
  let { id } = useParams();
  let { nombre_usuario } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:3001/supermercados/superById/${id}`).then((response) => {
      setSupermercado(response.data);
    });
  }, []);

  return (
    <div className='welcome-container'>
      <div className="top-bar">
        <Link to={`/homeSuper/${nombre_usuario}`} className="back-link">
          Volver
        </Link>
      </div>
      <h2 className='welcome-title'>
        Supermercado <br></br> {supermercado.nombre} - {supermercado.direccion}
      </h2>
      <div className='button-container'>
        <Link to={`/welcome/${id}/${nombre_usuario}/mapa`} className='welcome-button'>
          Mapa
        </Link>
        <Link to={`/welcome/${id}/${nombre_usuario}/producto`} className='welcome-button'>
          Productos
        </Link>
        <Link to={`/welcome/${id}/${nombre_usuario}/gondolas`} className='welcome-button'>
          Góndolas
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
