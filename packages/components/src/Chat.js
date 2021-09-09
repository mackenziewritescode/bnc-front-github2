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
import io from 'socket.io-client'
import { useForm, Controller } from 'react-hook-form'

import { AppHeader } from './AppHeader'

const socket = io('http://localhost:5000')

export function Chat() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])

  const { control, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    socket.emit('message', data.message)
    reset({ message: '' })
  }

  useEffect(() => {
    socket.on('message', function (msg) {
      setChat([...chat, msg])
      console.log(chat)
    })
    return () => {
      socket.disconnect()
    }
  }, [chat])

  const renderedChat = chat.map((msg, index) => (
    <View key={index} style={styles.chatMessage}>
      <Text style={styles.chatText}>{msg}</Text>
    </View>
  ))

  return (
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
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
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

// import React, { useEffect, useState } from 'react'
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   TextInput,
// } from 'react-native'
// import { useForm, Controller } from 'react-hook-form'

// export function Chat() {
//   const [chat, setChat] = useState([])

//   const { control, handleSubmit, reset } = useForm()

//   const onSubmit = (data) => {
//     setChat([...chat, data.message])
//     reset({ message: '' })
//   }

//   const renderedChat = chat.map((msg, index) => (
//     <View key={index} style={styles.chatMessage}>
//       <Text style={styles.chatText}>{msg}</Text>
//     </View>
//   ))

//   return (
//     <View style={styles.chatContainer}>
//       <View style={styles.renderedChat}>{renderedChat}</View>
//       <Controller
//         control={control}
//         rules={{
//           required: true,
//         }}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             style={styles.input}
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//           />
//         )}
//         name="message"
//         defaultValue=""
//       />
//       <Button
//         style={styles.sendButton}
//         title="MOBILE CHAT"
//         onPress={handleSubmit(onSubmit)}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   body: {
//     backgroundColor: 'white',
//   },
//   chatContainer: {
//     width: '70%',
//     maxWidth: 300,
//     marginHorizontal: 'auto',
//   },
//   input: {
//     borderColor: 'grey',
//     borderWidth: 2,
//     height: 32,
//     marginVertical: 10,
//   },
//   renderedChat: {
//     borderColor: '#d6d6d6',
//     borderWidth: 2,
//     height: 200,
//     overflow: 'scroll',
//     backgroundColor: '#fff4bd',
//   },
//   chatMessage: {
//     // width: 'fit-content',
//     maxWidth: '100%',
//     backgroundColor: '#f57542',
//     paddingHorizontal: 8,
//     paddingVertical: 8,
//     borderRadius: 8,
//     marginHorizontal: 6,
//     marginTop: 4,
//   },
//   chatText: {
//     color: 'white',
//   },
//   sendButton: {
//     backgroundColor: 'red',
//   },
// })
