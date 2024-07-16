import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";
import MapaTitulo from "./MapaTitulo";
import MapaCuadricula from "./MapaCuadricula";
import ubicGondolaSeleccionada from "./PathFinding.js/ubicGondolaSeleccionada";
import encontrarCamino from "./PathFinding.js/encontrarCamino";

export default function Mapa({ supermercado, productosSeleccionados }) {
  const [gondolas, setGondolas] = useState([]);
  const [gondolasRest, setGondolasRest] = useState([]);
  const [gondolaCaminoCorto, setGondolaCaminoCorto] = useState({});

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

  const gonCaminoCorto = () => {
    let caminoCorto = Infinity;
    let gondCaminoCorto = null;

    //Busco gondola de camino corto
    gondolasAjustadas.forEach((gondola) => {
      productosSeleccionados.forEach((producto) => {
        if (producto.GondolaId === gondola.id) {
          const camino = encontrarCamino(
            supermercado.entradax - 1,
            supermercado.entraday - 1,
            gondola.ubicacionx,
            gondola.ubicaciony,
            gondolasAjustadas,
            supermercado.ancho,
            supermercado.largo
          );
          if (camino && camino.length < caminoCorto) {
            caminoCorto = camino.length;
            gondCaminoCorto = gondola;
          }
        }
      });
    });

    //Agrego gondolas restantes
    const gondolasRestantes = new Set();
    gondolasAjustadas.forEach((gondola) => {
      productosSeleccionados.forEach((producto) => {
        if (
          producto.GondolaId === gondola.id &&
          gondola.id !== gondCaminoCorto.id
        ) {
          gondolasRestantes.add(gondola);
        }
      });
    });

    return {
      gondCaminoCorto,
      gondolasRestantes: Array.from(gondolasRestantes),
    };
  };

  useEffect(() => {
    const gondolaCamCorto = gonCaminoCorto().gondCaminoCorto;
    setGondolaCaminoCorto(gondolaCamCorto);
    setGondolasRest(gonCaminoCorto().gondolasRestantes);
  }, [gondolas, productosSeleccionados, supermercado]);

  const prodSeleccionado = (gondolaId) => {
    const product = [];
    productosSeleccionados.map((producto) => {
      if (producto.GondolaId === gondolaId) {
        product.push(producto);
      }
    });
    return product;
  };

  // Mapa de góndola camino CORTO
  const mapaCaminoCorto = gondolaCaminoCorto ? (
    <View key={gondolaCaminoCorto.id}>
      <MapaCuadricula
        numAncho={supermercado.ancho}
        numLargo={supermercado.largo}
        entradax={supermercado.entradax - 1}
        entraday={supermercado.entraday - 1}
        salidax={supermercado.salidax - 1}
        saliday={supermercado.saliday - 1}
        gondolas={gondolasAjustadas}
        productosSeleccionados={prodSeleccionado(gondolaCaminoCorto.id)}
        mapaCorto={true}
      />
    </View>
  ) : null;

  // Mapear las góndolas ajustadas a componentes MapaCuadricula
  const mapasRestantes = gondolasRest.map((gondola, index) => {
    const gondolaAnterior = index > 0 ? gondolasRest[index - 1] : gondolaCaminoCorto;
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
          gondolaAnterior={gondolaAnterior}
          mapaCorto={false}
        />
      </View>
    );
  });

  return (
    <View>
      <MapaTitulo supermercado={supermercado} />
      {mapaCaminoCorto}
      {mapasRestantes}
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
