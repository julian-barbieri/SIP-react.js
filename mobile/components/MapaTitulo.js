import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function MapaTitulo() {
  return (
    <View style={styles.titulos}>
      <View style={styles.subtitulos}>
        <Text style={[styles.entrada]}>Entrada</Text>
        <Text style={[styles.salida]}>Salida</Text>
        <Text style={[styles.gondola]}>Góndolas</Text>
      </View>
      <View>
        <Text style={styles.camino}>
          Encuentra tu producto siguiendo el camino azul
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulos: {
    alignItems: "center",
    marginTop: 20,
    margin: 15,
    padding: 10,
    backgroundColor: "#f9f9f9", // Fondo claro para resaltar el contenedor
    borderRadius: 10, // Bordes redondeados
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.2,
    boxShadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  subtitulos: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%", // Ajusta el ancho para asegurar el espacio alrededor
    paddingVertical: 10, // Añade espacio vertical
  },
  entrada: {
    color: "#28a745", // Verde
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 10, // Espacio horizontal alrededor del texto
  },
  salida: {
    color: "#cd5c5c", // Rojo
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  gondola: {
    color: "#fd7e14", // Naranja
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 10,
  },
  camino: {
    color: "#4169e1", // Azul
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "600",
    paddingHorizontal: 20, // Espacio horizontal para evitar el texto pegado a los bordes
  },
});
