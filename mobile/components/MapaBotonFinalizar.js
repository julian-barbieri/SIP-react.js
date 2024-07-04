import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MapaBotonFinalizar({ idSupermercado }) {
  const navigation = useNavigation();
  const handleFinalizar = () => {
    navigation.navigate("Welcome", {
      idSupermercado: idSupermercado,
    });
  };

  return (
    <Pressable style={styles.finalizarButton} onPress={handleFinalizar}>
      <Text style={styles.finalizarButtonTexto}>Finalizar recorrido</Text>
    </Pressable>
  );
}
// Estilos
const styles = StyleSheet.create({
  finalizarButton: {
    border: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#4169e1",
    marginTop: 50,
    marginRight: 75,
    marginLeft: 75,
    marginBottom: 50,
    alignItems: "center",
  },
  finalizarButtonTexto: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
