import openSocket from 'socket.io-client';
import _localStorage from './localStorage';
const socket = openSocket('http://localhost:3001', {
    transports: ['websocket', 'polling', 'flashsocket'],
    query: {
        auth: "123"
    }
});
// var socket = io('http://localhost',);



socket.on('connect', data => console.log('connect', data));
socket.on('event', data => console.log('event', data));
socket.on('disconnect', data => console.log('disconnect', data));


socket.emit("checkSocket", { propName: "prop value" })
socket.emit("connectToUser", _localStorage.get("user").id)

export default socket