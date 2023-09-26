'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import io from 'Socket.IO-client'
let socket

export default function Home() {
  useEffect(() => {
    socketInitializer()
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
  }
  const [text, setText] = useState("");

  function doSomething(newText: string): void {
    setText(newText);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <script src="/socket.io/socket.io.js"></script>
      <script>
        const socket = io();
      </script>
      <h1>Hello WOrld!</h1>
      <input type="text" onChange={(current) => doSomething(current.target.value)} value={text} />
      <p>{text}</p>
    </main>
  )
}
