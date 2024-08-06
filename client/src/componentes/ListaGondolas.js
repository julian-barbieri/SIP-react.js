// ListaGondolas.js
import React from 'react';
import '../styles/ListaGondolas.css';

function ListaGondolas({ gondolas }) {
  return (
    <div className='gondolas'>
      {gondolas.map(gondola => (
        <div key={gondola.id} className='gondola-card'>
          <h3>{gondola.codigo}</h3>
          <p>{gondola.categoria}</p>
        </div>
      ))}
    </div>
  );
}

export default ListaGondolas;
