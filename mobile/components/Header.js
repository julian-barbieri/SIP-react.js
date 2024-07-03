// Header.js
import styles from '../styles/stylesHeader';
import React from 'react';
import { Text, View } from 'react-native';

export default function Header({title}) {
  return (
    <View role="header" style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}