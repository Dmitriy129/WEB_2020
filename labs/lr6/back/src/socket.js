const http = require('http')
const { serverApp: app } = require("./app")
const io = require('socket.io')(app);
// const io = require('socket.io')(http.Server(app));

const { serverApps: apps } = require("./app")
// const io = require('socket.io')(apps);


io.on('connection', (socket) => {
    console.log("User connected");

    socket.on('checkSocket', (data) => {
        console.log("socketCheck", data)
    });

    socket.on('disconnect', function () {
        console.log('Got disconnect!');

    });
});
console.log("socker required")
module.exports = io

