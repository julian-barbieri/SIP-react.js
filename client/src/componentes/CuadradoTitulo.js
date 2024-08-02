import React from 'react';
import '../styles/CuadradoTitulo.css';

function CuadradoTitulo({ className }) {
  const estilo = {
    display: 'flex',
    width: '15px',
    height: '15px',
    textAlign: 'center',
    justifyContent: 'center',
    marginRight: '10px',
  };

  if (className && className.includes('entrada')) {
    estilo.backgroundColor = 'green'; // Cambia el color de fondo a verde si tiene la clase 'entrada'
  }

  if (className && className.includes('salida')) {
    estilo.backgroundColor = 'red'; // Cambia el color de fondo a rojo si tiene la clase 'entrada'
  }

  if (className && className.includes('gondolaOcupada')) {
    estilo.backgroundColor = 'blue'; // Cambia el color de fondo a azul si tiene la clase 'entrada'
  }
  
  return(
    <div style={estilo} className='container-cuadrado'></div>
  );
}

export default CuadradoTitulo;

