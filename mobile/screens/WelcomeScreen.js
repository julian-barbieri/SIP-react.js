import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import axios from "axios";
import ListaProductos from "../components/ListaProductos";
import BackButton from "../components/buttons/BackButton";
import ShoppingCartButton from "../components/buttons/ShoppingCartButton";

export default function WelcomeScreen({ route, navigation }) {
  const { idSupermercado } = route.params;
  const [supermercado, setSupermercado] = useState({});
  const [listaProductos, setListaProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://192.168.0.109:3001/supermercados/superById/${idSupermercado}`
      )
      .then((response) => {
        setSupermercado(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del supermercado:", error);
      });
  }, [idSupermercado]);

  const handleSeleccionarProducto = (item) => {
    setProductosSeleccionados([...productosSeleccionados, item]);
  };

  const handleEliminarProducto = (id) => {
    setProductosSeleccionados((prevProductos) =>
      prevProductos.filter((producto) => producto.id !== id)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <ShoppingCartButton 
          productosSelecc={productosSeleccionados} 
          onEliminarProducto={handleEliminarProducto} 
        />
      </View>
      <ListaProductos 
        productosSelecc={productosSeleccionados} 
        supermercadoId={idSupermercado} 
        onSeleccionarProducto={handleSeleccionarProducto}
        onEliminarProducto={handleEliminarProducto} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingBottom: "10px",
  }
});
