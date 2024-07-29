import React from 'react';
import Label from './Label';
import CuadradoTitulo from './CuadradoTitulo';
import '../styles/MapTitles.css';

function MapTitles() {
  return (
    <div className="titulos">
      <div className="fila">
        <CuadradoTitulo className="entrada" />
        <Label text="Entrada" />
      </div>

      <div className="fila">
        <CuadradoTitulo className="salida" />
        <Label text="Salida" />
      </div>

      <div className="fila">
        <CuadradoTitulo className="gondolaOcupada" />
        <Label text="Góndolas" />
      </div>
    </div>
  );
}

export default MapTitles;
