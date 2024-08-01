import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../auth/axiosConfig.js';
import '../styles/Welcome.css';
import Title from '../componentes/Title.js';
import ButtonWithLogo from '../componentes/buttons/ButtonWithLogo.js';
import { AiOutlineHome } from "react-icons/ai";
import { IoIosBasket } from "react-icons/io";
import { CiGrid2H } from "react-icons/ci";
import { FaMapMarkerAlt } from 'react-icons/fa';

function Welcome() {
  const [supermercado, setSupermercado] = useState({});
  let { id, nombre_usuario } = useParams();

  useEffect(() => {
    axiosInstance.get(`http://localhost:3001/supermercados/superById/${id}`).then((response) => {
      setSupermercado(response.data);
    });
  }, [id]);

  return (
    <div>
      <Title text={`${supermercado.nombre} - ${supermercado.direccion}`} />
      <div className='button-container'>
        <ButtonWithLogo to={`/app/${nombre_usuario}`} text="Home" logo={<AiOutlineHome size={32}/>}/>
        <ButtonWithLogo to={`/welcome/${id}/${nombre_usuario}/mapa`} text="Mapa" logo={<FaMapMarkerAlt  size={32}/>}/>
        <ButtonWithLogo to={`/welcome/${id}/${nombre_usuario}/producto`} text="Productos" logo={<IoIosBasket size={32}/>}/>
        <ButtonWithLogo to={`/welcome/${id}/${nombre_usuario}/gondolas`} text="Góndolas"  logo={<CiGrid2H size={32}/>}/>
      </div>
    </div>
  );
}

export default Welcome;
