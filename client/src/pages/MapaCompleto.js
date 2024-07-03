import React, { useState, useEffect } from 'react';
import CuadradoBlanco from '../componentes/CuadradoBlanco.js'; 
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../auth/axiosConfig.js';
import '../styles/MapaCompleto.css';

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

  useEffect(() => {
    axiosInstance.get(`http://localhost:3001/gondolas/${id}`).then((response) => {
      setGondolas(response.data);
    });
    axiosInstance.get(`http://localhost:3001/supermercados/superById/${id}`).then((response) => {
      setNumLargo(response.data.largo);
      setNumAncho(response.data.ancho);
      setEntradax(response.data.entradax);
      setEntraday(response.data.entraday);
      setSalidax(response.data.salidax);
      setSaliday(response.data.saliday);

      document.documentElement.style.setProperty('--numAncho', response.data.ancho);
      document.documentElement.style.setProperty('--numLargo', response.data.largo);

      const nuevaMatriz = [];
      for (let fila = 0; fila < response.data.largo; fila++) {
        nuevaMatriz.push(new Array(response.data.ancho).fill(0));
      }
      setCuadrosSeleccionados(nuevaMatriz);
    });
  }, [id]);

  const toggleCuadro = (fila, columna) => {
    const nuevaCuadricula = [...cuadrosSeleccionados];
    for (let i = 0; i < numLargo; i++) {
      for (let j = 0; j < numAncho; j++) {
        nuevaCuadricula[i][j] = 0;
      }
    }
    nuevaCuadricula[fila][columna] = 1;
    setCuadrosSeleccionados(nuevaCuadricula);
  };

  const renderCuadros = () => {
    const cuadros = [];
  
    for (let fila = 0; fila < numLargo; fila++) {
      for (let columna = 0; columna < numAncho; columna++) {
        const esSalida = fila === saliday - 1 && columna === salidax - 1;
        const esEntrada = fila === entraday - 1 && columna === entradax - 1;

        const numeroFila = columna === 0 ? <span className="numeroFila">{fila + 1}</span> : null;
        const numeroColumna = fila === 0 ? <span className="numeroColumna">{columna + 1}</span> : null;
        const columna0 = columna === 0 ? "columna-0" : "";

        const gondolaEnEsteCuadro = gondolas.find((gondola) => {
          return (
            fila + 1 >= gondola.ubicaciony &&
            fila + 1 < gondola.ubicaciony + gondola.largo &&
            columna + 1 >= gondola.ubicacionx &&
            columna + 1 < gondola.ubicacionx + gondola.ancho
          );
        });

        const estiloCuadro = `
        cuadro-container
        ${gondolaEnEsteCuadro ? 'gondolaOcupada' : ''}
        ${esSalida ? 'salida' : ''}
        ${esEntrada ? 'entrada' : ''}
        `.trim();

        cuadros.push(
          <div key={`${fila}-${columna}`} className={estiloCuadro}>
            {gondolaEnEsteCuadro && fila + 1 === gondolaEnEsteCuadro.ubicaciony && columna + 1 === gondolaEnEsteCuadro.ubicacionx && (
              <div key={gondolaEnEsteCuadro.id} className='idGondola'>{gondolaEnEsteCuadro.codigo}</div>
            )}
            <div className='numerosColumna'>{fila === 0 ? `${columna + 1}` : ""} </div>
            <div className='numerosFila'>{columna === 0 ? `${fila + 1}` : ""}</div>
            <div className='cuadrados'>
              <CuadradoBlanco
                className={estiloCuadro}
                onClick={() => toggleCuadro(fila, columna)}
              />
            </div>
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
        {gondolas.map(gondola => (
          <li key={gondola.id}>{gondola.codigo}: {gondola.categoria}</li>
        ))}
      </div>
      <div className="cuadricula">
        {renderCuadros()}
      </div>
    </div>
  );
}

export default MapaCompleto;
