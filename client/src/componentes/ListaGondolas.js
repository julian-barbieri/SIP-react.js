import React from 'react';
import '../styles/ListaGondolas.css';

function ListaGondolas({ gondolas }) {
  return (
    <div className='gondolas'>
      {gondolas.map(gondola => (
        <li key={gondola.id}>{gondola.codigo}: {gondola.categoria}</li>
      ))}
    </div>
  );
}

export default ListaGondolas;
