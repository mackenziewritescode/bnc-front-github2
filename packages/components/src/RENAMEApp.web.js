import React, { useEffect, useState, useRef } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native'
import * as msTeams from '@microsoft/teams-js'
import { io } from 'socket.io-client'
import { useForm, Controller } from 'react-hook-form'

import { AppHeader } from './AppHeader'

export function App() {
  const [onTeams, setOnTeams] = useState(false)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() => {
    msTeams.initialize(() => setOnTeams(true))
  }, [])

  const { control, handleSubmit, reset } = useForm()

  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:5000')
    socketRef.current.on('message', (msg) => {
      setChat([...chat, msg])
    })
    return () => socketRef.current.disconnect()
  }, [chat])

  const onSubmit = (data) => {
    socketRef.current.emit('message', data.message)
    // setChat([...chat, data.message])
    reset({ message: '' })
  }

  const renderedChat = chat.map((msg, index) => (
    <View key={index} style={styles.chatMessage}>
      <Text style={styles.chatText}>{msg}</Text>
    </View>
  ))

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <AppHeader />
          <View style={styles.body}>
            <View style={styles.chatContainer}>
              <View style={styles.renderedChat}>{renderedChat}</View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="message"
                defaultValue=""
              />
              <Button title="Send Message" onPress={handleSubmit(onSubmit)} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'gray',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'gray',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  chatContainer: {
    width: '70%',
    maxWidth: 300,
    marginHorizontal: 'auto',
  },
  input: {
    borderColor: 'grey',
    borderWidth: 2,
    height: 32,
    marginVertical: 10,
  },
  renderedChat: {
    borderColor: '#d6d6d6',
    borderWidth: 2,
    height: 200,
    overflow: 'scroll',
    backgroundColor: 'azure',
  },
  chatMessage: {
    // width: 'fit-content',
    maxWidth: '100%',
    backgroundColor: '#1bc2f5',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 6,
    marginTop: 4,
  },
  chatText: {
    color: 'white',
  },
})
