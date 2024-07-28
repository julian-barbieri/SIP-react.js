import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CreateSuper.css';
import { Formik, Form } from 'formik';
import axiosInstance from '../auth/axiosConfig.js';
import BackButton from '../componentes/BackButton.js';
import Title from '../componentes/Title.js';
import GuardarButton from '../componentes/GuardarButton.js';
import CompleteField from '../componentes/CompleteField.js';
import validationSchema from '../validation/validationSchema'; 
import SwalAlert from '../componentes/SwalAlert.js';

function CreateSuper() {

  let { nombre_usuario } = useParams();
  let navigate = useNavigate();
  const initialValues = {
    nombre: "",
    direccion: "",
    largo: 10,
    ancho: 10,
    entradax: 5,
    entraday: 10,
    salidax: 6,
    saliday: 10,
  }

  const crearSuper = async (data) => {
    try {
      const adminResponse = await axiosInstance.get(`http://localhost:3001/administradores/adminByUsername/${nombre_usuario}`);
      const adminId = adminResponse.data.id;

      const supermercadoData = {
        ...data,
        AdministradoreId: adminId,
      };

      await axiosInstance.post(`http://localhost:3001/supermercados`, supermercadoData);

      SwalAlert('success', 'Supermercado creado', ''); // Usa el componente SwalAlert
      
      navigate(`/app/${nombre_usuario}`);
    } catch (error) {
      SwalAlert('error', 'Error al crear supermercado', error.message); // Maneja el error usando el componente SwalAlert
    }
  };

  return (
    <div>
      <BackButton />
      <Title text='Creá tu supermercado' />
      <Formik initialValues={initialValues} onSubmit={crearSuper} validationSchema={validationSchema}>
        <Form>
          <div className="form-group">
            <div className="column">
              <CompleteField text={"Nombre"} id={"nombre"} name={"nombre"} placeholder={"Ej: Coto"} type={"text"} />
              <CompleteField text={"Dirección"} id={"direccion"} name={"direccion"} placeholder={"Ej: Av. Santa Fe 1256"} type={"text"} />
            </div>
            <div className="column">
              <CompleteField text={"Largo"} id={"largo"} name={"largo"} placeholder={"Metros de largo"} type={"number"} />
              <CompleteField text={"Ancho"} id={"ancho"} name={"ancho"} placeholder={"Metros de ancho"} type={"number"} />
            </div>
            <div className="column">
              <CompleteField text={"Entrada X"} id={"entradax"} name={"entradax"} placeholder={null} type={"number"} />
              <CompleteField text={"Entrada Y"} id={"entraday"} name={"entraday"} placeholder={null} type={"number"} />
            </div>
            <div className="column">
              <CompleteField text={"Salida X"} id={"salidax"} name={"salidax"} placeholder={null} type={"number"} />
              <CompleteField text={"Salida Y"} id={"saliday"} name={"saliday"} placeholder={null} type={"number"} />
            </div>
          </div>
          <GuardarButton />
        </Form>
      </Formik>
    </div>
  );
}

export default CreateSuper;
