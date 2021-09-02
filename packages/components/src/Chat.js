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
import { useForm, Controller } from 'react-hook-form'

export function Chat() {
  const [chat, setChat] = useState([])

  const { control, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    setChat([...chat, data.message])
    reset({ message: '' })
  }

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
      <Button
        style={styles.sendButton}
        title="MOBILE CHAT"
        onPress={handleSubmit(onSubmit)}
      />
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
    backgroundColor: '#fff4bd',
  },
  chatMessage: {
    // width: 'fit-content',
    maxWidth: '100%',
    backgroundColor: '#f57542',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 6,
    marginTop: 4,
  },
  chatText: {
    color: 'white',
  },
  sendButton: {
    backgroundColor: 'red',
  },
})
