var fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const WebSocket = require("ws");
const WSManager = require("./ws")

// const options = {
//   key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
//   cert: fs.readFileSync(process.env.SSL_FULLCHAIN_KEY),
// };

const app = express();
// const apps = https.createServer(options, app)
const wss = new WebSocket.Server({ server: app });

const wsm = new WSManager(wss)

app.use(express.static(path.join(__dirname, "../front")));

app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));

app.use(require("./routes"));

// const serverApps = apps.listen(process.env.HTTPS_PORT || 443);

const serverApp = app.listen(process.env.HTTP_PORT || 80, () =>
  console.log(`Listening on port ${process.env.HTTP_PORT || 80}`)
);




module.exports = { app, wsm };



