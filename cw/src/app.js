var fs = require("fs");
const https = require("https");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const Sentry = require("@sentry/node");

const WebSocket = require("ws");
const WSManager = require("./ws")

const options = {
  key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
  cert: fs.readFileSync(process.env.SSL_FULLCHAIN_KEY),
};

const app = express();
const apps = https.createServer(options, app)
const wss = new WebSocket.Server({ server: apps });

const wsm = new WSManager(wss)

Sentry.init({ dsn: "https://4d1add518ada4f0bad5a137d1ca41d14@o466919.ingest.sentry.io/5481666" });

app.use(Sentry.Handlers.requestHandler())

app.use(express.static(path.join(__dirname, "../front")));

if (process.env.NODE_ENV !== "dev") {
  const saverPath = '.' + process.env.IMG_SAVE_PATH + "front/public/savedImg/"
  app.use(express.static(path.join(__dirname,)));
  require('./api').dirCreater('.' + process.env.IMG_SAVE_PATH + "front/public/savedImg/")
}
app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));

app.set("view engine", "pug");
app.set("views", process.env.DEFAULT_PUG_PATH || "./front/src/view");

app.use(require("./routes"));

app.use(Sentry.Handlers.errorHandler());

const serverApps = apps.listen(process.env.HTTPS_PORT || 443);

const serverApp = app.listen(process.env.HTTP_PORT || 80, () =>
  console.log(`Listening on port ${process.env.HTTP_PORT || 80}`)
);




module.exports = { app, apps, wsm };



