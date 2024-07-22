import React, { useEffect, useRef  } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FinalizarButton({
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
    </View>
  );
}

const styles = StyleSheet.create({
  finalizarButtonContainer: {
    marginBottom: 20,
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
  }
});
