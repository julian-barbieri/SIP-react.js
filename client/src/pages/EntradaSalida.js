import React, { useState, useEffect } from 'react';
import CuadradoBlanco from '../componentes/CuadradoBlanco.js'; 
import { useParams, Link } from 'react-router-dom';
import '../styles/MapaCompleto.css'

function EntradaSalida() {
  const { ancho, largo } = useParams();
  let { nombre_usuario } = useParams();
  const [cuadrosSeleccionados, setCuadrosSeleccionados] = useState([]);

  // Parsear los valores de ancho y largo a números enteros
  const numAncho = parseInt(ancho, 10);
  const numLargo = parseInt(largo, 10);

  useEffect(() => {
    document.documentElement.style.setProperty('--numAncho', numAncho);
    document.documentElement.style.setProperty('--numLargo', numLargo);
  
    // Inicializar la matriz de cuadros seleccionados con todos los cuadros en blanco (0)
    const nuevaMatriz = [];
    for (let fila = 0; fila < numLargo; fila++) {
      nuevaMatriz.push(new Array(numAncho).fill(0));
    }
    setCuadrosSeleccionados(nuevaMatriz);
  }, [numAncho, numLargo]);
  

  // Crear una matriz para representar la cuadrícula
  const cuadricula = new Array(numLargo);

  for (let i = 0; i < numLargo; i++) {
    cuadricula[i] = new Array(numAncho).fill(0);
  }

  const toggleCuadro = (fila, columna) => {
    // Copiar la matriz actual de cuadros seleccionados
    const nuevaCuadricula = [...cuadrosSeleccionados];

    // Deseleccionar cualquier cuadro azul previamente seleccionado
    for (let i = 0; i < numLargo; i++) {
      for (let j = 0; j < numAncho; j++) {
        nuevaCuadricula[i][j] = 0;
      }
    }

    // Seleccionar el cuadro en la fila y columna dadas
    nuevaCuadricula[fila][columna] = 1;

    // Actualizar el estado con la nueva matriz de cuadros seleccionados
    setCuadrosSeleccionados(nuevaCuadricula);
  };

  const renderCuadros = () => {
    const cuadros = [];
  
    for (let fila = 0; fila < numLargo; fila++) {
      for (let columna = 0; columna < numAncho; columna++) {
        cuadros.push(
          <CuadradoBlanco
            key={`${fila}-${columna}`}
            //seleccionado={cuadrosSeleccionados[fila][columna] === 1}
            //className={`cuadro-blanco ${cuadricula[fila][columna] === 1 ? 'cuadro-seleccionado' : ''}`}
            
            //seleccionado={cuadrosSeleccionados[fila][columna] === 1 }
            //className={`cuadro-blanco ${cuadrosSeleccionados[fila][columna] === 1 ? 'cuadro-seleccionado' : ''}`}
            
            
            onClick={() => toggleCuadro(fila, columna)}
          />
        );
      }
    }
  
    return cuadros;
  };
  

  return (
    <div>
      <div className="top-bar">
        <Link to={`/homeSuper/${nombre_usuario}/createSuper`} className="back-link">
          Volver
        </Link>
      </div>
      <h2>Entrada y Salida del Supermercado</h2>
      <div className="cuadricula">{renderCuadros()}</div>
    </div>
  );
}

export default EntradaSalida;
