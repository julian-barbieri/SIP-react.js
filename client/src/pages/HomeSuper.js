import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import '../styles/HomeSuper.css';

function HomeSuper() {
  const [supermercados, setSupermercados] = useState([]);
  const [admin, setAdmin] = useState({});
  let { nombre_usuario } = useParams();
  let navigate = useNavigate();   
  axios.get(`http://localhost:3001/administradores/adminByUsername/${nombre_usuario}`).then((response) => {
    setAdmin(response.data);
    return response.data;
  }).then(async (admin) => {
    await axios.get(`http://localhost:3001/supermercados/${admin.id}`).then((response) => {
      // Transforma los supermercados en un array de objetos { value, label }
      const supermercadosOptions = response.data.map((supermercado) => ({
        value: supermercado.id, // Debes usar el identificador único del supermercado aquí
        label: `${supermercado.nombre} - ${supermercado.direccion}`,
    }));
      setSupermercados(supermercadosOptions);
    })
  });

  const handleContinue = (selectedOption) => {
    
    // selectedOption contiene el supermercado seleccionado
    if (selectedOption) {
      const id = selectedOption.value;
      navigate(`/welcome/${id}/${nombre_usuario}`);
    }
  };

  const logout = () => {
    window.location.replace('/login');
  };

  return (
    <div className='homeSuper'>
      <div className='titleHomeSuper'>
        Bienvenido al market list {nombre_usuario}
      </div>
      <div className='comboboxHomeSuper'>
        <Select
          options={supermercados}
          onChange={handleContinue}// Llama a handleContinue cuando se selecciona un supermercado
          placeholder="Selecciona un supermercado"
        />
      </div>
      <NavLink to={`/homeSuper/${nombre_usuario}/createSuper`} className="createSuperLink">
        Crea un supermercado
      </NavLink>
      <div className='buttonsContainer'>
        <button className='exitButton' onClick={logout}>
          Salir
        </button>
      </div>
    </div>
  );
}

export default HomeSuper;
