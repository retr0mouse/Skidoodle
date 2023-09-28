'use client'
import { useEffect, useState } from 'react';
import io from 'Socket.IO-client';
let socket


export default function Home() {
 

  useEffect(() => {
    socketInitializer()
  }, []);

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connection', () => {
      console.log('connected')
    })

    socket.on('update-input', msg => {
      console.log(msg);
      setFinalText(msg);
    })
  }

  const [currentText, setCurrentText] = useState("");
  const [finalText, setFinalText] = useState("");

  function doSomething(newText: string): void {
    setCurrentText(newText);
  }

  function submitText(text: string): void {
    socket.emit('input-change', text);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <script src="/socket.io/socket.io.js"></script>
      <script>
        const socket = io();
      </script>
      <h1>Hello WOrld!</h1>
      <input type="text" onChange={(current) => doSomething(current.target.value)} value={currentText} />
      <button onClick={() => submitText(currentText)}>SUBMIT SUKA</button>
      <h1>{finalText}</h1>
    </main>
  )
}
