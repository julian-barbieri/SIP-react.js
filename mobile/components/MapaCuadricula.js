// MapaCuadricula.js
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ubicGondolaSeleccionada from "./PathFinding.js/ubicGondolaSeleccionada";
import encontrarCamino from "./PathFinding.js/encontrarCamino";
import _ from "lodash";
import ubicInicioCamino from "./PathFinding.js/ubicInicioCamino";

export default function MapaCuadricula({
  numAncho,
  numLargo,
  entradax,
  entraday,
  salidax,
  saliday,
  gondolas,
  productosSeleccionados,
  mapaCorto,
  gondolaAnterior,
  productoAnterior
}) {
  const [grid, setGrid] = useState([]);
  useEffect(() => {
    const initialGrid = Array(numLargo).fill().map(() => Array(numAncho).fill({ occupied: false }));
    gondolas.forEach((gondola) => {
      for (let row = gondola.ubicaciony; row < gondola.ubicaciony + gondola.largo; row++) {
        for (let col = gondola.ubicacionx; col < gondola.ubicacionx + gondola.ancho; col++) {
          initialGrid[row][col] = { occupied: true };
        }
      }
    });

    setGrid(initialGrid);

  }, []);

  function calculateCirclePosition(ubicExacta) {
    const circleStyle = {
      position: "absolute",
      width: 15,
      height: 15,
      borderRadius: 7.5,
      backgroundColor: "#4a90e2",
      alignItems: "center",
      justifyContent: "center",
    };

    switch (ubicExacta) {
      case "derecha":
        circleStyle.borderRadius = 0;
        circleStyle.right = 0;
        circleStyle.top = 2.5;
        circleStyle.height = "80%";
        circleStyle.width = 8;
        circleStyle.backgroundColor = '#fd7e14';
        break;
      case "izquierda":
        circleStyle.borderRadius = 0;
        circleStyle.left = 0;
        circleStyle.top = 2.5;
        circleStyle.height = "80%";
        circleStyle.width = 8;
        circleStyle.backgroundColor = '#fd7e14';
        break;
      case "arriba":
        circleStyle.borderRadius = 0;
        circleStyle.top = 0;
        circleStyle.right = 2.5;
        circleStyle.height = 8;
        circleStyle.width = "80%";
        circleStyle.backgroundColor = '#fd7e14';
        break;
      case "abajo":
        circleStyle.borderRadius = 0;
        circleStyle.bottom = 0;
        circleStyle.right = 2.5;
        circleStyle.height = 8;
        circleStyle.width = "80%";
        circleStyle.backgroundColor = '#fd7e14';
        break;
    }

    return circleStyle;
  }

  const renderFila = (fila) => {
    const cuadros = [];

    for (let columna = 0; columna < numAncho; columna++) {
      const esEntrada = fila === entraday && columna === entradax;
      const esSalida = fila === saliday && columna === salidax;

      const gondolaOcupada = gondolas.find((gondola) => {
        return (
          fila >= gondola.ubicaciony &&
          fila < gondola.ubicaciony + gondola.largo &&
          columna >= gondola.ubicacionx &&
          columna < gondola.ubicacionx + gondola.ancho
        );
      });

      const estiloCuadro = {
        ...styles.cuadro,
        backgroundColor: esEntrada
          ? "#4caf50"
          : esSalida
            ? "#cd5c5c"
            : gondolaOcupada
              ? "#fedb41"
              : "white",
      };

      const isLastRightCell =
        gondolaOcupada &&
        columna === gondolaOcupada.ubicacionx + gondolaOcupada.ancho - 1 &&
        fila >= gondolaOcupada.ubicaciony &&
        fila < gondolaOcupada.ubicaciony + gondolaOcupada.largo;

      const isLastLeftCell =
        gondolaOcupada &&
        columna === gondolaOcupada.ubicacionx &&
        fila >= gondolaOcupada.ubicaciony &&
        fila < gondolaOcupada.ubicaciony + gondolaOcupada.largo;

      const isLastTopCell =
        gondolaOcupada &&
        fila === gondolaOcupada.ubicaciony &&
        columna >= gondolaOcupada.ubicacionx &&
        columna < gondolaOcupada.ubicacionx + gondolaOcupada.ancho;

      const isLastBottomCell =
        gondolaOcupada &&
        fila === gondolaOcupada.ubicaciony + gondolaOcupada.largo - 1 &&
        columna >= gondolaOcupada.ubicacionx &&
        columna < gondolaOcupada.ubicacionx + gondolaOcupada.ancho;

      cuadros.push(
        <View key={`${fila}-${columna}`} style={estiloCuadro}>
          {!gondolaOcupada && camino && camino.some(([x, y]) => x === columna && y === fila) ? (
            <View style={styles.camino}></View>
          ) : null}

          {productosSeleccionados.map((producto) => {
            if (
              gondolaOcupada &&
              producto.GondolaId === gondolaOcupada.id &&
              (
                (producto.ubicExacta === "derecha" && isLastRightCell) ||
                (producto.ubicExacta === "izquierda" && isLastLeftCell) ||
                (producto.ubicExacta === "arriba" && isLastTopCell) ||
                (producto.ubicExacta === "abajo" && isLastBottomCell)
              )
            ) {
              return (
                <View
                  key={producto.id}
                  style={calculateCirclePosition(producto.ubicExacta)}
                >
                  <Text style={styles.numProd}></Text>
                </View>
              );
            }
            return null;
          })}
        </View>
      );
    }

    return cuadros;
  };

  const renderCuadricula = () => {

    const filas = [];
    for (let fila = 0; fila < numLargo; fila++) {
      filas.push(
        <View key={`fila-${fila}`} style={styles.fila}>
          {renderFila(fila)}
        </View>
      );
    }
    return filas;
  };
  
  const camino = encontrarCamino(
    mapaCorto ? entradax : ubicInicioCamino(gondolaAnterior, productoAnterior).gondolax,
    mapaCorto ? entraday : ubicInicioCamino(gondolaAnterior, productoAnterior).gondolay,
    ubicGondolaSeleccionada(gondolas, productosSeleccionados).gondolax,
    ubicGondolaSeleccionada(gondolas, productosSeleccionados).gondolay,
    gondolas,
    numAncho,
    numLargo
  );

  return (
    <View style={styles.containerCuadricula}>
      {productosSeleccionados.map((producto) => (
        <View key={producto.id} style={styles.itemProd}>
          <Text style={styles.prodItemNombre}>{producto.nombre}</Text>
          <Text style={styles.prodItemCategoria}>{producto.categoria}</Text>
          <Text style={styles.prodItemCategoria}>Longitud: {camino.length}</Text>
        </View>
      ))}
      <ScrollView style={styles.verticalScroll}>
        <ScrollView horizontal contentContainerStyle={styles.cuadricula}>
          {renderCuadricula()}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerCuadricula: {
    alignItems: "center",
    marginTop: 10,
    display: "flex",
  },
  cuadricula: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  verticalScroll: {
    maxHeight: 500,
  },
  fila: {
    flexDirection: "row",
  },
  cuadro: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  numProd: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  camino: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: "#4a90e2",
    position: "absolute",
    top: 7.5,
    left: 7.5,
  },
  itemProd: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowOpacity: 0.1,
    boxShadowRadius: 4,
    elevation: 3,
    width: "90%",
    alignItems: "center",
  },
  prodItemNombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  prodItemCategoria: {
    fontSize: 12,
    color: "grey",
  },
});