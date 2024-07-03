import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header.js";
import styles from "../styles/stylesLoginForm.js";
import LoginForm from "../components/LoginForm.js";
import Logo from "../components/Logo.js";

export default function LoginScreen() {
  const [nombre_usuario, setNombre_usuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <Logo />
      <Header title="Iniciar sesión" />
      <LoginForm />
      <Pressable
        role="button"
        style={styles.registerLink}
        onPress={handleRegister}
      >
        <Text style={styles.linkText}>Registrarme</Text>
      </Pressable>
    </View>
  );
}
