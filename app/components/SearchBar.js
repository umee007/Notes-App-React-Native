import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import color from '../misc/color'

export default function SearchBar({containerStyle}) {
  return (
    <View style={containerStyle}>
      <TextInput style={styles.searchBar} placeholder='Search Here..'/>
    </View>
  )
}

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 0.5,
        borderColor: color.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20,
    },
})