import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export function AppHeaderTeams() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teams App</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    backgroundColor: '#9cffca',
  },
  text: {
    fontSize: 36,
    fontWeight: '600',
  },
})
