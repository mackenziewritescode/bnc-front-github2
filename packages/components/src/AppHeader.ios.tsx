import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export function AppHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>IOS App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#ff8157',
  },
  text: {
    fontSize: 36,
    fontWeight: '600',
  },
})
