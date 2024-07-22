import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import MapaTitulo from "./MapaTitulo";
import MapaCuadricula from "./MapaCuadricula";
import ubicGondolaSeleccionada from "./PathFinding.js/ubicGondolaSeleccionada";
import encontrarCamino from "./PathFinding.js/encontrarCamino";

export default function Mapa({ supermercado, productosSeleccionados }) {
  const [gondolas, setGondolas] = useState([]);
  const [gondolasRest, setGondolasRest] = useState([]);
  const [gondolaCaminoCorto, setGondolaCaminoCorto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

    // Busco la gondola de camino corto desde la entrada
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

    // Inicializo las góndolas restantes
    const gondolasRestantes = gondolasAjustadas.filter(
      (gondola) =>
        productosSeleccionados.some(
          (producto) => producto.GondolaId === gondola.id
        ) && gondola.id !== gondCaminoCorto.id
    );

    // Ordeno las gondolas restantes por el camino más corto desde la última gondola procesada
    const ordenGondolas = [gondCaminoCorto];
    let ultimaGondola = gondCaminoCorto;

    while (gondolasRestantes.length > 0) {
      caminoCorto = Infinity;
      let siguienteGondola = null;
      let indiceGondola = -1;

      gondolasRestantes.forEach((gondola, index) => {
        const camino = encontrarCamino(
          ultimaGondola.ubicacionx,
          ultimaGondola.ubicaciony,
          gondola.ubicacionx,
          gondola.ubicaciony,
          gondolasAjustadas,
          supermercado.ancho,
          supermercado.largo
        );
        if (camino && camino.length < caminoCorto) {
          caminoCorto = camino.length;
          siguienteGondola = gondola;
          indiceGondola = index;
        }
      });

      if (siguienteGondola) {
        ordenGondolas.push(siguienteGondola);
        ultimaGondola = siguienteGondola;
        gondolasRestantes.splice(indiceGondola, 1);
      } else {
        break;
      }
    }

    return ordenGondolas;
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

  const productoAnterior = (gondolaAnteriorId) => {
    return productosSeleccionados.find(
      (producto) => producto.GondolaId === gondolaAnteriorId
    );
  };

  useEffect(() => {
    const ordenGondolas = gonCaminoCorto();
    setGondolaCaminoCorto(ordenGondolas[0]);
    setGondolasRest(ordenGondolas.slice(1));
  }, [gondolas, productosSeleccionados, supermercado]);

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
    </View>
  );
}


// Estilos
const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    padding: 0,
    marginLeft: 50,
    marginRight: 50,
  },
  hidden: {
    opacity: 0,
  },
  indicator: {
    alignItems: "center",
    position: "absolute",
    left: "44%",
    fontSize: 16,
  },
});
