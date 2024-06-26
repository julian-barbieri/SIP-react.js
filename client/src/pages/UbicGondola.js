import React, { useState, useEffect } from 'react';
import CuadradoBlanco from '../componentes/CuadradoBlanco.js'; 
import { useParams, Link } from 'react-router-dom';
import '../styles/MapaCompleto.css'
import EntradaSalida from './EntradaSalida.js';

function UbicGondola() {

  let { nombre_usuario } = useParams();
  let {id} = useParams();

  return (
    <div>
      <div className="top-bar">
        <Link to={`/welcome/${id}/${nombre_usuario}/gondolas/crear`} className="back-link">
          Volver
        </Link>
      </div>
      <h2>Ubicá la gondola</h2>
      
    </div>
  );
}

export default UbicGondola