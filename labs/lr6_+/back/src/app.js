var fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Ws = require("./socket")
// const Ws = (new (require("./socket"))).getInstance();

/*  */
require('dotenv').config()
/*  */

// const WebSocket = require("ws");
// const WSManager = require("./ws")
const options = {
    key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
    cert: fs.readFileSync(process.env.SSL_FULLCHAIN_KEY),
};

const app = express();
const apps = https.createServer(options, app)
// const io = require('socket.io')(apps);

// const io = require('socket.io')(require('http').Server(app));


var corsOptions = {
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept'
};

app.use(cors(corsOptions));
// const wss = new WebSocket.Server({ server: apps });

// const wsm = new WSManager(wss)



// app.use(express.static(path.join(__dirname, "../front")));

app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));


const serverApps = apps.listen(process.env.HTTPS_PORT || 443);

const serverApp = app.listen(process.env.HTTP_PORT || 80, () =>
    console.log(`Listening on port ${process.env.HTTP_PORT || 80}`)
);
// app.use('/api', require("./routes"))
// setTimeout(() =>
//     new Ws(serverApp)
//     , 1000)


// Ws.init(serverApp)

console.log("app/apps required")

module.exports = { app, apps, serverApps, serverApp };



// require('dotenv').config()
// console.log('process.env', process.env)
