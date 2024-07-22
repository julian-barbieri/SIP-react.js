import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation para manejar la navegación
import SuperList from "../components/SuperList";
import Logo from "../components/Logo.js";

export default function HomeSuperScreen({ route }) {
  const { id } = route.params;
  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    axios
      .get(`http://192.168.107.127:3004/clientes/clienteById/${id}`)
      .then((response) => {
        setCliente(response.data);
      });
  }, [id]);

  const nav = useNavigation(); // Obtiene el objeto de navegación

  const handleSalir = () => {
    nav.goBack(); // Navega hacia atrás
  };

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.welcomeText}>
        Bienvenido al Market List {cliente.nombre_completo}!
      </Text>
      <SuperList style={styles.selectSuper} />
      <Pressable style={styles.salirButton} onPress={handleSalir} title="Salir">
        <Text style={styles.salirButtonText}>Salir</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginTop: 40,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  salirButton: {
    backgroundColor: "#cd5c5c",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 100,
    alignItems: "auto",
    justifyContent: "auto",
  },
  salirButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
