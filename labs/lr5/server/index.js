"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var corsOptions = {
    credentials: true,
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization,X-Requested-With,X-HTTP-Method-Override,Content-Type,Cache-Control,Accept'
};
app.use(cors(corsOptions));
app.post('/print', function (req, res) {
    fs.writeFile('./config.json', JSON.stringify(req.body), function (err) {
        if (err) console.log(err);
    });
    res.json({ msg: 'print' });
});
app.listen(3000, () => console.log("server started"));
