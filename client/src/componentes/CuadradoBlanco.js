import React from 'react';

function CuadradoBlanco({ gondolaCodigo, onClick, className }) {
  const estilo = {
    backgroundColor: 'white',
    border: '1px solid black',
    width: '25px',
    height: '25px',
    margin: '2px',
  };

  if (className && className.includes('entrada')) {
    estilo.backgroundColor = 'green'; // Cambia el color de fondo a verde si tiene la clase 'entrada'
  }

  if (className && className.includes('salida')) {
    estilo.backgroundColor = 'red'; // Cambia el color de fondo a verde si tiene la clase 'entrada'
  }

  if (className && className.includes('gondolaOcupada')) {
    estilo.backgroundColor = 'blue'; // Cambia el color de fondo a verde si tiene la clase 'entrada'
  }

  return(
  <div className={className} style={estilo} onClick={onClick}>
      {gondolaCodigo && 
      <div className="idGondola">
        {gondolaCodigo}
      </div>}
  </div>) ;
}

export default CuadradoBlanco;

