import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import color from '../misc/color';
export default function RoundIconBtn({ antIconName, antIconSize, antIconColor, press, style }) {
  return <AntDesign name={antIconName} size={antIconSize || 24} color={antIconColor || color.LIGHT} style={[styles.icon,{...style}]} onPress={press} />
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: color.PRIMARY,
    padding: 15,
    borderRadius: 50,
    elevation: 5,

  }
})