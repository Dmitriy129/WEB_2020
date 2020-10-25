const https = require("https");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
var fs = require("fs");
const State = require("./state");

const options = {
  key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
  cert: fs.readFileSync(process.env.SSL_FULLCHAIN_KEY),
};

app.use(express.static(path.join(__dirname, "../front")));
app.use("/book", express.static(path.join(__dirname, "../front")));

app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }));
app.use(bodyParser.json({ limit: "20mb" }));

app.set("view engine", "pug");
app.set("views", "./front/src/view");

https.createServer(options, app).listen(process.env.HTTPS_PORT);
app.listen(process.env.HTTP_PORT, () =>
  console.log(`Listening on port ${process.env.HTTP_PORT}`)
);

var datadb = new State().getInstance().getState();

app.use((req, res, next) => {
  let user = userCheck(
    getCookie(req.headers.cookie, "userID"),
    getCookie(req.headers.cookie, "accessToken")
  );
  if (user) {
    req.user = user;
    res.cookie("userID", user.id, {
      maxAge: 900000,
      httpOnly: true,
    });
    res.cookie("accessToken", user.accessToken, {
      maxAge: 900000,
      httpOnly: true,
    });
    if (req._parsedUrl.pathname === "/login") {
      res.redirect("/");
      return;
    }
  } else if (
    req._parsedUrl.pathname !== "/login" &&
    req._parsedUrl.pathname !== "/git"
  ) {
    res.clearCookie("userID");
    res.clearCookie("accessToken");
    res.redirect("/login");
    return;
  }
  next();
});
app.use(require("./routes"));
app.use(require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/book", require("./routes/book"));
app.use("/bookForm", require("./routes/bookform"));
app.use("/booklist", require("./routes/booklist"));

var userCheck = function (userID, accessToken) {
  let user = datadb.users.find((user) => user.id == userID);
  return user && user.accessToken === accessToken && user;
};

var getCookie = function (cookie, name) {
  if (cookie) {
    var match = cookie.match(new RegExp("(^| )" + name + "=([^;]+)", "g"));
    if (match)
      //  return match[2];
      for (key in match) {
        let val = match[key].split("=")[1];
        if (val && val !== "undefined") return val;
      }
  }
};

setInterval(
  () =>
    fs.writeFile("./config/Lib.json", JSON.stringify(datadb), "utf8", (err) => {
      if (err) throw err;
    }),
  6000
);

module.exports = app;
