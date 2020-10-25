// var app = require("express")();

// app.listen(3000);

// app.get("/", function(req, res) {
//   res.send("Hello World");
// });

// содежимое index.js
const http = require("http");
const server = http.createServer((request, response) =>
  response.end("Hello World")
);
server.listen(3000);
