import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CreateSuper.css';
import { Formik, Form } from 'formik';
import SwalAlert from '../componentes/SwalAlert.js';
import axiosInstance from '../auth/axiosConfig.js';
import BackButton from "../componentes/buttons/BackButton.js";
import Title from '../componentes/Title.js';
import CompleteField from '../componentes/CompleteField.js';
import GuardarButton from '../componentes/buttons/GuardarButton.js';
import initialValues from '../componentes/initialValues.js';
import validationSchemaSuper from '../validations/validationSchemaSuper.js';

function CreateSuper() {

  let { nombre_usuario } = useParams();
  let navigate = useNavigate();

  const crearSuper = async (data) => {
    // Obtener el ID del administrador
    const adminResponse = await axiosInstance.get(`http://localhost:3001/administradores/adminByUsername/${nombre_usuario}`);
    const adminId = adminResponse.data.id;

    const supermercadoData = {
      ...data,
      AdministradoreId: adminId,
    };
    await axiosInstance.post(`http://localhost:3001/supermercados`, supermercadoData);
    SwalAlert('success', 'Supermercado creado', ''); // Usa el componente SwalAlert
    // Navegar a donde desees después de crear el supermercado
    navigate(`/app/${nombre_usuario}`);
  }

  return (
    <div>
      <BackButton to={`/app/${nombre_usuario}`}/>
      <Title text='Creá tu supermercado' />
      <Formik initialValues={initialValues} onSubmit={crearSuper} validationSchema={validationSchemaSuper}>
        <Form>
        <div className="form-group-super">
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