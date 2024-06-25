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
  
  useEffect(() => {
    const fetchAdminAndSupermercados = async () => {
      try {
        // Solicitar datos del administrador
        const adminResponse = await axios.get(`http://localhost:3001/administradores/adminByUsername/${nombre_usuario}`);
        const adminData = adminResponse.data;
        setAdmin(adminData);

        // Solicitar supermercados basados en el ID del administrador
        const supermercadosResponse = await axios.get(`http://localhost:3001/supermercados/${adminData.id}`);
        const supermercadosOptions = supermercadosResponse.data.map((supermercado) => ({
          value: supermercado.id,
          label: `${supermercado.nombre} - ${supermercado.direccion}`,
        }));
        setSupermercados(supermercadosOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAdminAndSupermercados();
  }, [nombre_usuario]);

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
      <NavLink to={`/app/${nombre_usuario}/createSuper/`} className="createSuperLink">
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
