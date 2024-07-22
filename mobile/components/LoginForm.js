import React, { useState } from "react";
import { Text, View, TextInput, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import axios from "axios";
import styles from "../styles/stylesLoginForm.js";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function LoginForm() {
  const [loginError, setLoginError] = useState(false);
  const navigation = useNavigation();

  const loginValidationSchema = yup.object().shape({
    nombre_usuario: yup.string().min(3).max(15).required("Campo obligatorio"),
    contraseña: yup.string().min(3).max(15).required("Campo obligatorio"),
  });

  const initialValues = {
    nombre_usuario: "juli",
    contraseña: "juli",
  };
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://192.168.107.127:3001/clientes/login",
        data
      );
      const idCliente = response.data.id;

      if (response.data === null) {
        // Usuario y/o contraseña incorrectos
        setLoginError(true);
      } else {
        setLoginError(false);
        // Redirige a la página del homeSuper

        navigation.navigate("HomeSuper", {
          id: idCliente,
        });
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
        validationSchema={loginValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
          <View>
            {loginError && (
              <Text style={styles.errorMessage}>
                Usuario y/o contraseña incorrectos.
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
              role="button"
              style={[
                styles.loginButton,
                { backgroundColor: isValid ? "#4169e1" : "gray" },
              ]}
              onPress={handleSubmit}
              title="Submit"
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Ingresar</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
}
