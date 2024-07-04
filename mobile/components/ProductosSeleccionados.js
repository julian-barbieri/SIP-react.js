import React, { useEffect, useRef  } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

export default function ProductosSeleccionados({
  eliminarProductoSeleccionado,
  productosSeleccionados,
  supermercadoId,
}) {
  // Marcar los productos seleccionados al inicializar el componente
  const scrollViewRef = useRef(null); // Referencia al ScrollView
  useEffect(() => {
    const initialCheckedItems = {};
    for (const producto of productosSeleccionados) {
      initialCheckedItems[producto.id] = true;
    }
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [productosSeleccionados]);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    navigation.navigate("Mapa", {
      idSupermercado: supermercadoId,
      productosSeleccionados: productosSeleccionados,
    });
  };

  return (
    <View>
      {/* BOTON FINALIZAR LISTA */}
      <View style={styles.finalizarButtonContainer}>
          <Pressable
            style={[
              styles.finalizarButton,
              {
                backgroundColor:
                  productosSeleccionados.length > 0 ? "#4169e1" : "gray",
              },
            ]}
            onPress={handleSubmit}
            title="Submit"
            disabled={productosSeleccionados.length <= 0}
          >
            <Text style={styles.buttonText}>Finalizar lista</Text>
          </Pressable>
        </View>
      <ScrollView 
        style={styles.selectedContainer}
        ref={scrollViewRef} // Asigna la referencia al ScrollView // Color del indicador de desplazamiento
      >
        <View style={styles.container}>
        
          {productosSeleccionados.map((producto) => (
            <View style={styles.productoSeleccionado} key={producto.id}>
              {/*Eliminar boton*/}
              <Pressable
                style={styles.eliminarButton}
                onPress={() => eliminarProductoSeleccionado(producto.id)}
              >
                <MaterialIcons style={styles.productoCruz} name="close" size={30} selectable={undefined} />
              </Pressable>
              {/*Info del producto*/}
              <View style={styles.infoContainer}>
                <Text style={styles.productoNombre}>{producto.nombre}</Text>
                <Text style={styles.productoMarca}>{producto.marca}</Text>
              </View>
            </View>
          ))}
        
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  selectedContainer: {
    minHeight: 20,
    maxHeight: 150,  // Ajusta según la cantidad de espacio necesario
    marginBottom: 10,
  },
  finalizarButtonContainer: {
    marginBottom: 10,
    paddingHorizontal: 50,
    width: "100%", // Ocupa todo el ancho disponible
  },
  finalizarButton: {
    width: "100%", // Hacer que el botón ocupe todo el ancho de su contenedor
    maxWidth: 300, // Máximo ancho para mantenerlo manejable
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  productoSeleccionado: {
    flexDirection: "row",
    maxWidth: '100%',
    marginBottom: 10,
    marginTop: 10,
    marginRight: 40,
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: "column", // Asegura que los textos se apilen verticalmente
    marginLeft: 10, // Espacio entre el texto y el botón de eliminación
    maxWidth: '100%', // Ajusta para no sobrepasar los límites del contenedor
    
  },
  productoNombre: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  productoMarca: {
    fontSize: 14,
    marginLeft: 10,
  },
  productoCruz: {
    marginRight: 10,
    color: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
