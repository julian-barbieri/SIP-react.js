import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function SuperList() {
  const [listaSuper, setListaSuper] = useState([]);
  const [superCompleto, setSuperCompleto] = useState([]);
  const navigation = useNavigation();

  //devuelve la lista de supermercados con productos
  useEffect(() => {
    axios
      .get(`http://192.168.0.117:3001/supermercados/with-products`)
      .then((response) => {
        setSuperCompleto(response.data);
        const supermercadosOptions = response.data.map((supermercado) => ({
          key: supermercado.id,
          nombre: supermercado.nombre,
          direccion: supermercado.direccion,
        }));
        setListaSuper(supermercadosOptions);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de supermercados:", error);
      });
  }, []);

  const handleOnSelect = (supermercado) => {
    navigation.navigate("Welcome", {
      idSupermercado: supermercado.key,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seleccioná el supermercado</Text>
      <FlatList
        data={listaSuper}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => handleOnSelect(item)}
          >
            <Text style={styles.itemText}>{item.nombre}</Text>
            <Text style={styles.itemDireccion}>{item.direccion}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 16,
    marginBottom: 10,
    elevation: 3,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  itemDireccion: {
    fontSize: 16,
    color: "#555",
  },
});
