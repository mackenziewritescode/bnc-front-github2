import React, { useRef, useState, useEffect } from 'react'
import io, { Socket } from 'socket.io-client'

type Props = {
  userId: number
  enabled: boolean
  onConnected?: () => void
}

type Message = {
  content: string
  senderId: string
  userId: string
  date: Date
}

const useWebSockets = ({ userId, enabled, onConnected }: Props) => {
  const ref = useRef<Socket>()
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = (msg: string, senderId: number) => {
    ref.current!.emit('message', {
      content: msg,
      senderId,
      userId,
      date: new Date(),
    })
  }

  useEffect(() => {
    if (!enabled) return

    const socket = io('localhost:5000')

    socket.emit('join', userId)

    socket.emit('message', (msg: Message) => {
      setMessages((prev) => prev.concat(msg))
    })

    socket.on('connect', () => console.log('A user has joined.'))
    socket.on('disconnect', () => console.log('A user has left.'))

    ref.current = socket

    return () => {
      socket.disconnect()
    }
  }, [enabled, userId])

  return { sendMessage, messages }
}
