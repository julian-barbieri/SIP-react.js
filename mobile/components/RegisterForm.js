import React, { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import styles from "../styles/stylesRegisterForm.js";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function RegisterForm() {
  const [usuarioExiste, setUsuarioExiste] = useState(false);
  const initialValues = {
    nombre_completo: "",
    nombre_usuario: "",
    contraseña: "",
  };

  const navigation = useNavigation();

  const registerValidationSchema = yup.object().shape({
    nombre_completo: yup.string().required("Campo obligatorio"),
    nombre_usuario: yup.string().min(3).max(15).required("Campo obligatorio"),
    contraseña: yup.string().min(3).max(15).required("Campo obligatorio"),
  });

  const onSubmit = async (data) => {
    try {
      // Verifica si el usuario ya existe
      const response = await axios.get(
        `http://192.168.0.109:3001/clientes/clienteByUsername/${data.nombre_usuario}`,
        data
      );
      if (response.data !== null) {
        // Usuario existe, establece usuarioExiste en true
        setUsuarioExiste(true);
      } else {
        setUsuarioExiste(false);
        // Usuario no existe, procede con el registro
        await axios.post("http://192.168.0.109:3001/clientes", data);
        // Redirige a la página de inicio de sesión
        alert("Registro exitoso");
        navigation.navigate("Login");
      }
    } catch (error) {
      // Manejo de errores aquí
      console.error(error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={registerValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <View>
            {errors.nombre_completo && touched.nombre_completo && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.nombre_completo}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              onChangeText={handleChange("nombre_completo")}
              value={values.nombre_completo}
              name="nombre_completo"
              onBlur={handleBlur("nombre_completo")}
            />
            {usuarioExiste && (
              <Text style={{ fontSize: 10, color: "red" }}>
                El usuario ya existe. Por favor, elija otro nombre de usuario.
              </Text>
            )}
            {errors.nombre_usuario && touched.nombre_usuario && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.nombre_usuario}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Usuario"
              onChangeText={handleChange("nombre_usuario")}
              value={values.nombre_usuario}
              name="nombre_usuario"
              onBlur={handleBlur("nombre_usuario")}
            />

            {errors.contraseña && touched.contraseña && (
              <Text style={{ fontSize: 10, color: "red" }}>
                {errors.contraseña}
              </Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              onChangeText={handleChange("contraseña")}
              value={values.contraseña}
              name="contraseña"
              onBlur={handleBlur("contraseña")}
              secureTextEntry
            />

            <Pressable
              style={[
                styles.registerButton,
                { backgroundColor: isValid ? "#4169e1" : "gray" },
              ]}
              onPress={handleSubmit}
              title="Submit"
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}
