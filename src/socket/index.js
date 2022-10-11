// import { io } from "socket.io-client";
import { io } from "socket.io-client";
const socket = io('ws://localhost:8000')

socket.on('connection', (data) => {
  console.log(data, 22);
})

socket.on('serverSend', (data) => {
  console.log('服务端发的消息为： ', data);
})

socket.emit('browserSend', { msg: '浏览器发的消息', name: '哈哈' })