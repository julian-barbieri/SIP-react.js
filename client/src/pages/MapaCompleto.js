import React, { useState, useEffect } from 'react';
import CuadradoBlanco from '../componentes/CuadradoBlanco.js'; 
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/MapaCompleto.css'
import axiosInstance from '../auth/axiosConfig.js';

function MapaCompleto() {
  const { id } = useParams();
  const { nombre_usuario } = useParams();
  const [cuadrosSeleccionados, setCuadrosSeleccionados] = useState([]);
  const [gondolas, setGondolas] = useState([]);
  const [entraday, setEntraday] = useState(5);
  const [entradax, setEntradax] = useState(5);
  const [saliday, setSaliday] = useState(5);
  const [salidax, setSalidax] = useState(5);
  const [numAncho, setNumAncho] = useState(10);
  const [numLargo, setNumLargo] = useState(10);  
  // Parsear los valores de ancho y largo a números enteros

  useEffect(() => {
    axiosInstance.get(`http://localhost:3001/gondolas/${id}`).then((response) => {
      setGondolas(response.data); // Obtener la lista de góndolas desde el servidor
    });
    axiosInstance.get(`http://localhost:3001/supermercados/superById/${id}`).then((response) => {
      setNumLargo(response.data.largo);
      setNumAncho(response.data.ancho);
      setEntradax(response.data.entradax);
      setEntraday(response.data.entraday);
      setSalidax(response.data.salidax);
      setSaliday(response.data.saliday);
      // Actualiza las variables CSS
      document.documentElement.style.setProperty('--numAncho', numAncho);
      document.documentElement.style.setProperty('--numLargo', numLargo);


      // Inicializar la matriz de cuadros seleccionados con todos los cuadros en blanco (0)
      const nuevaMatriz = [];
      for (let fila = 0; fila < numLargo; fila++) {
        nuevaMatriz.push(new Array(numAncho).fill(0));
      }
      setCuadrosSeleccionados(nuevaMatriz);

    });
  }, []);

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
        const esSalida = fila === saliday-1 && columna === salidax-1;
        const esEntrada = fila === entraday-1 && columna === entradax-1;
  
        const numeroFila = columna === 0 ? <span className="numeroFila">{fila + 1}</span> : null;

        // Agrega la clase "numeroColumna" solo a los cuadrados de la primera fila (encabezado)
        const numeroColumna = fila === 0 ? <span className="numeroColumna">{columna + 1}</span> : null;
  
        // Agrega la clase "columna-0" solo a los contenedores de la primera columna
        const columna0 = columna === 0 ? "columna-0" : "";
        
        // Verificar si el cuadro está ocupado por una góndola
        const estaOcupado = gondolas.some((gondola) => {
          return (
            fila+1 >= gondola.ubicaciony &&
            fila+1 < gondola.ubicaciony + gondola.largo &&
            columna+1 >= gondola.ubicacionx &&
            columna+1 < gondola.ubicacionx + gondola.ancho

          );
        });
        
        // Aplicar las clases de estilo adecuadas
        const estiloCuadro = `
        cuadro-container
        ${estaOcupado ? 'gondolaOcupada' : ''}
        ${esSalida ? 'salida' : ''}
        ${esEntrada ? 'entrada' : ''}
        `.trim(); // Eliminar espacios en blanco extra
        
        cuadros.push(
          <div key={`${fila}-${columna}`} className={estiloCuadro}>
            {estaOcupado && gondolas.map(gondola => {
              if(
                 (fila === gondola.ubicaciony && columna === gondola.ubicacionx) ||
                 (fila+1 === gondola.ubicaciony && columna+1 === gondola.ubicacionx)){
                return(
                  <div key={gondola.id} className='idGondola'>{gondola.id}</div>
                )
              }
            })
            }
            <div className='numerosColumna'>{fila === 0 ? `${columna+1}` : ""} </div>
            <div className='numerosFila'>{columna === 0 ? `${fila+1}` : ""}</div>
            <div className='cuadrados'>
              <CuadradoBlanco
              className={estiloCuadro}
              onClick={() => toggleCuadro(fila, columna)}
            /></div>
          </div>
        );
      }
    }
  
    return cuadros;
  };
  
  return (
    <div className='container-mapa'>
      <div className="top-bar">
        <Link to={`/welcome/${id}/${nombre_usuario}`} className="back-link">
          Volver
        </Link>
      </div>
      <h2>Mapa del Supermercado</h2>
      <div className='titulos'>
        <h4 className='entrada'>Entrada</h4>
        <h4 className='salida'>Salida</h4>
        <h4 className='gondolaOcupada'>Góndolas</h4>
      </div>
      <div className='gondolas'>
        
          {gondolas.map(gondola => 
            {return(
              <li key={gondola.id}>{gondola.id}: {gondola.categoria}</li>
            )})
          }  
        
      </div>
      
      <div className="cuadricula">
        {renderCuadros()}
      </div>
    </div>
  );
}

export default MapaCompleto;