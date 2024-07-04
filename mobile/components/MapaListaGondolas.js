import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapaListaGondolas({ gondolas }) {
  return (
    <View style={styles.listaGondolas}>
    {gondolas.map((gondola) => (
      <View key={gondola.id} style={styles.item}>
        <Text style={styles.gondolaItem}>{gondola.categoria}</Text>
      </View>
    ))}
  </View>
  );
}
// Estilos

const styles = StyleSheet.create({
    listaGondolas:{
      flexDirection: 'row', // Permite mostrar en filas
      flexWrap: 'wrap', // Permite que los items se acomoden en varias filas si no caben en una
      justifyContent: 'space-between', // Distribuye el espacio entre items
      marginTop: 10,
      padding: 10,
    },
    item: {
      width: '48%', // Ajusta el ancho de cada item para que entren dos por fila con un pequeño espacio entre ellos
      marginBottom: 10, // Espacio entre filas
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 2,
      backgroundColor: '#f9f9f9', // Color de fondo para distinguir cada item
      alignItems: 'center', // Alinea el texto al centro horizontalmente
    },
    gondolaItem: {
      color: 'grey',  
    },
});