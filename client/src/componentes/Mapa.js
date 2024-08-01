import React, {useState} from 'react';
import CuadradoBlanco from '../componentes/CuadradoBlanco.js';
import '../styles/Mapa.css'

function Mapa({ numLargo, numAncho, gondolas, entraday, entradax, saliday, salidax }) {
  const [cuadrosSeleccionados, setCuadrosSeleccionados] = useState(
    Array(numLargo).fill().map(() => Array(numAncho).fill(0))
  );

  const toggleCuadro = (fila, columna, gondolaEnEsteCuadro) => {
    console.log(columna, fila, gondolaEnEsteCuadro.codigo);
    const nuevaCuadricula = cuadrosSeleccionados.map((filaArray, filaIndex) =>
      filaArray.map((col, colIndex) => (filaIndex === fila && colIndex === columna ? 1 : 0))
    );
    setCuadrosSeleccionados(nuevaCuadricula);
  };

  const renderColumnHeaders = () => (
    <div className="fila-numeros">
      {Array.from({ length: numAncho }, (_, i) => (
        <div key={i} className="numero-columna">{i + 1}</div>
      ))}
    </div>
  );

  const renderRowHeaders = () => (
    <div className="columna-numeros">
      {Array.from({ length: numLargo }, (_, i) => (
        <div key={i} className="numero-fila">{i + 1}</div>
      ))}
    </div>
  );
  
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
            <div className='cuadrados'>
              <CuadradoBlanco
                gondolaCodigo={gondolaEnEsteCuadro && fila + 1 === gondolaEnEsteCuadro.ubicaciony && columna + 1 === gondolaEnEsteCuadro.ubicacionx ? gondolaEnEsteCuadro.codigo : null}
                className={estiloCuadro}
                onClick={() => toggleCuadro(fila, columna, gondolaEnEsteCuadro)}
              >
              </ CuadradoBlanco>
            </div>
          </div>
        );
      }
    }
  
    return cuadros;
  };

  return (
    <div className="mapa-container">
      <div className="mapa-header">
        <div className="fila-numeros-container">
          {renderColumnHeaders()}
        </div>
        <div className="mapa-content">
          {renderRowHeaders()}
          <div className="cuadricula">
            {renderCuadros()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mapa;
