import React, {useState} from 'react';
import CuadradoBlanco from '../componentes/CuadradoBlanco.js';
import '../styles/Mapa.css'

function Mapa({ numLargo, numAncho, gondolas, entraday, entradax, saliday, salidax }) {
  const [cuadrosSeleccionados, setCuadrosSeleccionados] = useState(
    Array(numLargo).fill().map(() => Array(numAncho).fill(0))
  );

  const toggleCuadro = (fila, columna) => {
    const nuevaCuadricula = cuadrosSeleccionados.map((filaArray, filaIndex) =>
      filaArray.map((col, colIndex) => (filaIndex === fila && colIndex === columna ? 1 : 0))
    );
    setCuadrosSeleccionados(nuevaCuadricula);
  };
  const renderCuadros = () => {
    const cuadros = [];
  
    for (let fila = 0; fila < numLargo; fila++) {
      for (let columna = 0; columna < numAncho; columna++) {
        const esSalida = fila === saliday - 1 && columna === salidax - 1;
        const esEntrada = fila === entraday - 1 && columna === entradax - 1;

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
    <div className="cuadricula">
      {renderCuadros()}
    </div>
  );
}

export default Mapa;
