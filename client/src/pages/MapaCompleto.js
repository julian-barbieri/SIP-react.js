import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../auth/axiosConfig.js';
import '../styles/MapaCompleto.css';
import BackButton from '../componentes/BackButton.js';
import Title from '../componentes/Title.js';
import ListaGondolas from '../componentes/ListaGondolas';
import Mapa from '../componentes/Mapa';
import MapTitles from '../componentes/MapTitles';

function MapaCompleto() {
  const { id, nombre_usuario } = useParams();
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

  return (
    <div>
      <BackButton to={`/welcome/${id}/${nombre_usuario}`} />
      <Title text={"Mapa del Supermercado"} />

      <MapTitles />

      <Mapa
        numLargo={numLargo}
        numAncho={numAncho}
        cuadrosSeleccionados={cuadrosSeleccionados}
        gondolas={gondolas}
        entraday={entraday}
        entradax={entradax}
        saliday={saliday}
        salidax={salidax}
      />

      <ListaGondolas gondolas={gondolas} />
    </div>
  );
}

export default MapaCompleto;
