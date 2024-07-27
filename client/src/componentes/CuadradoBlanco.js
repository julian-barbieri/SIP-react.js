import React from 'react';

function CuadradoBlanco({ seleccionado, onClick, className }) {
  const estilo = {
    backgroundColor: seleccionado ? 'blue' : 'white',
    border: '1px solid black',
    width: '25px',
    height: '25px',
    margin: '2px',
    cursor: 'pointer',
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
  
  return <div className={className} style={estilo} onClick={onClick}></div>;
}

export default CuadradoBlanco;

