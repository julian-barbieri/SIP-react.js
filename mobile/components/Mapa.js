import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import axios from "axios";
import MapaTitulo from "./MapaTitulo";
import MapaListaGondolas from "./MapaListaGondolas";
import MapaCuadricula from "./MapaCuadricula";

export default function Mapa({ supermercado, productosSeleccionados }) {
  //const numAncho = supermercado.ancho;
  //const numLargo = supermercado.largo;
  const numLargo = 10;
  const numAncho = 10;
  const entradax = supermercado.entradax - 1;
  const entraday = supermercado.entraday - 1;
  const salidax = supermercado.salidax - 1;
  const saliday = supermercado.saliday - 1;
  const [gondolas, setGondolas] = useState([]);

  // Obtener la lista de góndolas desde el servidor
  useEffect(() => {
    axios
      .get(`http://192.168.0.117:3001/gondolas/${supermercado.id}`)
      .then((response) => {
        setGondolas(response.data);
      });
  }, [productosSeleccionados, supermercado]);

  const gondolasAjustadas = gondolas.map((gondola) => ({
    ...gondola,
    ubicacionx: gondola.ubicacionx - 1,
    ubicaciony: gondola.ubicaciony - 1,
  }));

  const gonSeleccionadas = () => {
    // Utilizamos un Set para asegurarnos de que no haya duplicados
    const gondolasSet = new Set();

    gondolas.forEach((gondola) => {
      productosSeleccionados.forEach((producto) => {
        if (producto.GondolaId === gondola.id) {
          gondolasSet.add(gondola);
        }
      });
    });

    // Convertimos el Set de nuevo a un array
    return Array.from(gondolasSet);
  };

  const prodSeleccionado = (gondolaId) => {
    const product = [];
    productosSeleccionados.map((producto) => {
      if (producto.GondolaId === gondolaId) {
        product.push(producto);
      }
    });
    return product;
  };

  // Mapear las góndolas ajustadas a componentes MapaCuadricula
  const mapasCuadricula = gonSeleccionadas().map((gondola) => {
    return (
      <View key={gondola.id}>
        <MapaCuadricula
          numAncho={supermercado.ancho}
          numLargo={supermercado.largo}
          entradax={supermercado.entradax - 1}
          entraday={supermercado.entraday - 1}
          salidax={supermercado.salidax - 1}
          saliday={supermercado.saliday - 1}
          gondolas={gondolasAjustadas}
          productosSeleccionados={prodSeleccionado(gondola.id)}
        />
      </View>
    );
  });
  return (
    <View>
      <MapaTitulo supermercado={supermercado} />
      <MapaListaGondolas gondolas={gondolas} />
      {mapasCuadricula}
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  containerMapa: {
    width: "auto",
    display: "flex",
    borderRadius: 8,
    borderWidth: 1,
    boxShadowColor: "#000",
    boxShadowOffset: {
      width: 0,
      height: 1,
    },
    boxShadowOpacity: 0.1,
    marginTop: 20,
    marginRight: 15,
    marginLeft: 15,
  },
  finalizarButton: {
    border: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#e0e0e0",
    marginTop: 50,
    marginRight: 75,
    marginLeft: 75,
    alignItems: "center",
  },
  finalizarButtonTexto: {
    color: "black",
  },
});
