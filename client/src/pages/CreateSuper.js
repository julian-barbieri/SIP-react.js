import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CreateSuper.css';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';
import axiosInstance from '../auth/axiosConfig.js';
import BackButton from '../componentes/BackButton.js';
import Title from '../componentes/Title.js';
import Label from '../componentes/Label.js';
import GuardarButton from '../componentes/GuardarButton.js';
import Input from '../componentes/Input.js';
import ErrorMsg from '../componentes/ErrorMsg.js';
import CompleteField from '../componentes/CompleteField.js';

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

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Campo obligatorio"),
    direccion: Yup.string().min(3).max(30).required("Campo obligatorio"),
    largo: Yup.number().min(1).required("Campo obligatorio"),
    ancho: Yup.number().min(1).required("Campo obligatorio"),
    entradax: Yup.number().min(0).required("Campo obligatorio"),
    entraday: Yup.number().min(0).required("Campo obligatorio"),
    salidax: Yup.number().min(0).required("Campo obligatorio"),
    saliday: Yup.number().min(0).required("Campo obligatorio"),
  });

  const crearSuper = async (data) => {
    // Obtener el ID del administrador
    const adminResponse = await axiosInstance.get(`http://localhost:3001/administradores/adminByUsername/${nombre_usuario}`);
    const adminId = adminResponse.data.id;

    const supermercadoData = {
      ...data,
      AdministradoreId: adminId,
    };
    await axiosInstance.post(`http://localhost:3001/supermercados`, supermercadoData);
    
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Supermercado creado",
      showConfirmButton: true,
      timer: 2500
    });
    // Navegar a donde desees después de crear el supermercado
    navigate(`/app/${nombre_usuario}`);
  }

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
