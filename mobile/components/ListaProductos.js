import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import axios from "axios";
import FinalizarButton from "./buttons/FinalizarButton";

export default function ListaProductos({
  supermercadoId,
  onSeleccionarProducto,
  productosSelecc,
  onEliminarProducto,
}) {
  const [listaProductos, setListaProductos] = useState([]);
  const [search, setSearch] = useState(""); // Estado para el término de búsqueda
  const limitOfProducts = 5;
  const [productosSeleccionados, setProductosSeleccionados] = useState([
    ...productosSelecc,
  ]);

  useEffect(() => {
    axios
      .get(`http://192.168.107.127:3001/productos/bySuper/${supermercadoId}`)
      .then((response) => {
        setListaProductos(response.data);
      })
      .catch((error) => {
        console.error(
          "Error al obtener los datos de los productos del supermercado:",
          error
        );
      });
  }, [supermercadoId]);

  useEffect(() => {
    setProductosSeleccionados(productosSelecc);
  }, [productosSelecc]);

  const handlePressProducto = (item) => {
    const isSelected = productosSeleccionados.some(
      (producto) => producto.id === item.id
    );
    if (isSelected) {
      setProductosSeleccionados((prevProductos) =>
        prevProductos.filter((producto) => producto.id !== item.id)
      );
      onEliminarProducto(item.id);
    } else if (productosSeleccionados.length < limitOfProducts) {
      setProductosSeleccionados((prevProductos) => [...prevProductos, item]);
      onSeleccionarProducto(item);
    } else {
      alert("Máximo " + limitOfProducts + " productos");
    }
  };

  const quitarProductosSinStock = (listaProductos) => {
    return listaProductos.filter((producto) => producto.stock === true);
  };

  // Filtrar la lista de productos según el término de búsqueda
  const filteredProductos = quitarProductosSinStock(listaProductos).filter(
    (item) =>
      item.nombre.toLowerCase().includes(search.toLowerCase()) || // Búsqueda por nombre
      item.marca.toLowerCase().includes(search.toLowerCase()) || // Búsqueda por marca
      item.categoria.toLowerCase().includes(search.toLowerCase()) || // Búsqueda por categoría
      item.subCategoria.toLowerCase().includes(search.toLowerCase()) // Búsqueda por subcategoría
  );

  return (
    <View style={styles.container}>
      {/* Finalizar button */}
      <FinalizarButton
        productosSeleccionados={productosSeleccionados}
        supermercadoId={supermercadoId}
      />
      {/* Barra de búsqueda */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar productos"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      {/* Lista de productos */}
      <FlatList
        contentContainerStyle={styles.flatListContent}
        numColumns={2}
        data={filteredProductos} // Mostrar la lista filtrada
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.productoItem,
              productosSeleccionados.some(
                (producto) => producto.id === item.id
              ) && styles.productoSeleccionado, // Estilo condicional
            ]}
            onPress={() => handlePressProducto(item)}
          >
            <Text style={styles.productoNombre}>{item.nombre}</Text>
            <Text style={styles.productoMarca}>{item.marca}</Text>
            {item.descuento === 0 && (
              <Text style={styles.productoPrecio}>${item.precioUnidad}</Text>
            )}
            {item.descuento > 0 && (
              <>
                <Text style={styles.productoPrecioDescuento}>
                  ${item.precioUnidad}
                </Text>
                <Text style={styles.productoPrecio}>
                  ${(item.precioUnidad * (1 - item.descuento / 100)).toFixed(2)}
                </Text>
              </>
            )}
            {item.stock === false && (
              <Text style={styles.stock}>Sin stock</Text>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    width: "90%",
    flexDirection: "row", // Alinea el icono y el input horizontalmente
    alignItems: "center", // Centra el input verticalmente
    marginBottom: 10,
  },
  input: {
    flex: 1, // Ocupa el espacio restante
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  productoItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    marginBottom: 10,
    marginHorizontal: 10,
    width: Dimensions.get("window").width / 2 - 30, // Ajusta el ancho para permitir margen
    elevation: 3,
  },
  productoNombre: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  productoPrecio: {
    fontSize: 16,
    color: "#007bff",
  },
  productoMarca: {
    fontSize: 16,
    color: "#555",
  },
  stock: {
    color: "#dc3545",
    fontWeight: "bold",
  },
  productoSeleccionado: {
    borderColor: "#000", // Cambia el color del borde a negro si está seleccionado
    borderWidth: 2,
  },
  productoPrecioDescuento: {
    textDecorationLine: "line-through",
  },
});
