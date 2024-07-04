import React from 'react'
import logo from '../logo.png';
import {StyleSheet, Image} from 'react-native'

export default function Logo() {
  return (
    <Image style={styles.Logo} source={logo} />
  )
}
const styles = StyleSheet.create({
    Logo: {
      height: 100,
      width: 100,
      margin: 20,
    },
  });


