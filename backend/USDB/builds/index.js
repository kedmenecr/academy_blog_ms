"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.send("Hello World!");
});
var port = 9003;
app.listen(port, function () {
    console.log("The app is running on port: " + port);
});
