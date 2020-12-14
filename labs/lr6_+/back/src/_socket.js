const http = require('http')
// const { serverApp: app } = require("./app")
// const io = require('socket.io')(app);
// const socket_io = require('socket.io')
const open = (app) => require('socket.io')(app)
// const io = require('socket.io')(http.Server(app));

// const { serverApps: apps } = require("./app")
// const io = require('socket.io')(apps);
// const _store = require("./store")
// const Store = (new (_store)).getInstance();

// io.on('connection', (socket) => {
//     console.log("User connected");


//     socket.on('connectUser', (id) => {
//         // Store.connectWsToUser(socket, id)
//     });

//     socket.on('checkSocket', (data) => {
//         console.log("socketCheck", data)
//     });


//     socket.on('tryBuyPapers', ({ id, count }) => {
//         // Store.findUserByWs(ws)
//         console.log("tryBuyPapers", data)
//     });



//     socket.on('disconnect', function () {
//         console.log('Got disconnect!');

//     });
// });
// console.log("socker required")




class Ws {

    init(app) {
        this.io = open(app);
        this.emit = this.io.emit
        this.on = this.io.on
        this.in = this.io.in
        this.join = this.io.join
        this.leave = this.io.leave
        this.to = this.io.to

        this.io.on('connection', (socket) => {
            console.log("User connected");


            socket.on('connectUser', (id) => {
                // Store.connectWsToUser(socket, id)
            });

            socket.on('checkSocket', (data) => {
                console.log("socketCheck", data)
            });


            socket.on('tryBuyPapers', ({ id, count }) => {
                // Store.findUserByWs(ws)
                console.log("tryBuyPapers", data)
            });



            socket.on('disconnect', function () {
                console.log('Got disconnect!');

            });
        });
        console.log("socker required")


    }

}
class SingletonWs {
    constructor() {
        if (!SingletonWs.instance) SingletonWs.instance = new Ws();
    }


    getInstance() {
        return SingletonWs.instance;
    }
}


module.exports = SingletonWs;
// module.exports = new Ws();

// module.exports = io

