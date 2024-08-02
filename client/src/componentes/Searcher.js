// src/componentes/Searcher.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Searcher.css'; // Puedes añadir un archivo CSS para estilos específicos

const Searcher = ({ busqueda, setBusqueda }) => {
  return (
    <div className="searcher-container">
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="searcher-input"
      />
    </div>
  );
};

Searcher.propTypes = {
  busqueda: PropTypes.string.isRequired,
  setBusqueda: PropTypes.func.isRequired,
};

export default Searcher;
