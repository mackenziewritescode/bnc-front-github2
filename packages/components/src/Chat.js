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
import io from 'socket.io-client'
import { useForm, Controller } from 'react-hook-form'

export function Chat() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const socketRef = useRef()
  let socket = socketRef.current

  const { control, handleSubmit, reset } = useForm()

  useEffect(() => {
    socket = io('http://localhost:5000')
    let isMounted = true

    socket.on('message', function (msg) {
      if (isMounted) setChat([...chat, msg])
      console.log(chat)
    })

    return () => {
      socket.disconnect()
      isMounted = false
    }
  }, [chat])

  const onSubmit = (data) => {
    socket.emit('message', data.message)
    reset({ message: '' })
  }

  return (
    <View style={styles.chatContainer}>
      <ScrollView style={styles.renderedChat}>
        {chat.map((msg, index) => (
          <View key={index} style={styles.chatMessage}>
            <Text style={styles.chatText}>{msg}</Text>
          </View>
        ))}
      </ScrollView>
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
            placeholder="Enter your message here"
          />
        )}
        name="message"
        defaultValue=""
      />
      <Button title="Send Message" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  chatContainer: {
    width: 300,
    // maxWidth: 300,
    marginTop: 30,
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
    backgroundColor: 'azure',
  },
  chatMessage: {
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
