import { AntDesign } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Pressable,
  Text,
  View,
  ScrollView
} from "react-native";
import React, { useState, useEffect } from 'react';

export default function ShoppingCartButton({ productosSelecc, onEliminarProducto }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [productosSeleccionados, setProductosSeleccionados] = useState([...productosSelecc]);
  
  useEffect(() => {
    setProductosSeleccionados(productosSelecc);
  }, [productosSelecc]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.shoppingCartButton} onPress={toggleModal}>
        <AntDesign name="shoppingcart" size={44} color="black" />
        {productosSeleccionados.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{productosSeleccionados.length}</Text>
          </View>
        )}
      </Pressable>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection="right"
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
            {productosSeleccionados.length > 0 ? 
            <Text style={styles.title}>Productos seleccionados:</Text> : 
            <Text style={styles.title}>Selecciona tus productos</Text>}

          <ScrollView>
          <View style={styles.container}>

 
        {(productosSeleccionados.map((producto) => (
          <View style={styles.productoSeleccionado} key={producto.id}>
            {/*Eliminar boton*/}
            <Pressable
              style={styles.eliminarButton}
              onPress={() => onEliminarProducto(producto.id)}
            >
              <MaterialIcons style={styles.productoCruz} name="close" size={30} selectable={undefined} />
            </Pressable>
            {/*Info del producto*/}
            <View style={styles.infoContainer}>
              <Text style={styles.productoNombre}>{producto.nombre}</Text>
              <Text style={styles.productoMarca}>{producto.marca}</Text>
            </View>
          </View>
        )))}   
        </View>
          </ScrollView>
          <Pressable onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  shoppingCartButton: {
    padding: 10,
    paddingHorizontal: 16,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  closeButtonText: {
    fontSize: 16,
  },
  badge: {
    position: "absolute",
    right: 5,
    top: 0,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 1,
    minWidth: 20,
    minHeight: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontWeight: "bold",
  },
});
