import React, { useEffect, useState } from 'react'
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
import io from 'socket.io-client'
import { useForm, Controller } from 'react-hook-form'

import { AppHeader } from './AppHeader'

const socket = io('http://localhost:5000')

export function App() {
  const [onTeams, setOnTeams] = useState(false)
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  useEffect(() => {
    msTeams.initialize(() => setOnTeams(true))
  }, [])

  const { control, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    socket.emit('message', data.message)
    reset({ message: '' })
  }

  useEffect(() => {
    socket.on('message', function (msg) {
      setChat([...chat, msg])
    })
  }, [chat])

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

// import React from 'react'
// import { Text, View, TextInput, Button, Alert } from 'react-native'
// import { useForm, Controller } from 'react-hook-form'

// export function App() {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()
//   const onSubmit = (data) => console.log(data)

//   return (
//     <View>
//       <Controller
//         control={control}
//         rules={{
//           required: true,
//         }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
//         )}
//         name="firstName"
//         defaultValue=""
//       />
//       {errors.firstName && <Text>This is required.</Text>}

//       <Controller
//         control={control}
//         rules={{
//           maxLength: 100,
//         }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
//         )}
//         name="lastName"
//         defaultValue=""
//       />

//       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//     </View>
//   )
// }
