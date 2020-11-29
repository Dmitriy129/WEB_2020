class WSManager {
    constructor(wss) {
        this.wss = wss
        this.rooms = {}
        this.configuration()
        this.onMsgArr = [
            (res, ws) => {
                switch (res.action) {
                    case "join":
                        this.join(res.room, ws)
                        break
                    case "leave":
                        this.leave(res.room, ws)
                        break
                    case "msg":
                        // console.log(res.msg)
                        break
                    default:
                        // console.log(res)
                        break
                }
            },
        ]
    }
    send(message) {
        typeof message === "string" || (message = JSON.stringify(message))
        this.wss.clients.forEach(ws => ws.send(message));
    }
    currWsSend(message, ws) {
        typeof message === "string" || (message = JSON.stringify(message))
        ws && ws.send(message);
    }
    addListner(cb) {
        this.onMsgArr.push(cb);
    }
    join(roomName, ws) {
        this.rooms[roomName] || (this.rooms[roomName] = [])
        this.rooms[roomName].indexOf(ws) === -1 && this.rooms[roomName].push(ws)
    }
    leave(roomName, ws) {
        if (this.rooms[roomName]) {
            this.rooms[roomName] = this.rooms[roomName].filter(ws_ => ws_ !== ws)
            this.rooms[roomName].length === 0 && delete this.rooms[roomName]
        }
    }
    remRoom(roomName) {
        this.rooms[roomName] && (this.rooms[roomName].length = 0)
    }
    roomSend(roomName, message) {
        typeof message === "string" || (message = JSON.stringify(message))
        this.rooms[roomName] && this.rooms[roomName].forEach(ws => ws && ws.send(message));

    }
    configuration() {
        this.interval = setInterval(() => {
            this.wss.clients.forEach((ws) => {
                if (ws.isAlive === false) return ws.terminate();
                ws.ping((res) => res);
            });
        }, 30000);

        this.wss.on('close', () => {
            clearInterval(interval);
        })

        this.wss.on('connection', (ws) => {
            ws.on('message',
                (message) => {
                    const res = JSON.parse(message)
                    for (let fun of this.onMsgArr) fun(res, ws)
                }
            )
        });


    }
}

class SingletonWSManager {
    constructor(wss) {
        if (!SingletonWSManager.instance) {
            SingletonWSManager.instance = new WSManager(wss);
        }
    }
    getInstance() {
        return SingletonWSManager.instance;
    }
}

module.exports = SingletonWSManager;