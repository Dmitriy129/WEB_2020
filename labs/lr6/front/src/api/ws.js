import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] });
// var socket = io('http://localhost',);



socket.on('connect', data => console.log('connect', data));
socket.on('event', data => console.log('event', data));
socket.on('disconnect', data => console.log('disconnect', data));


socket.emit("checkSocket", { propName: "prop value" })

export default socket