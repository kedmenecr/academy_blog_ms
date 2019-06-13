"use strict";
exports.__esModule = true;
var express = require("express");
var jwt = require("jsonwebtoken");
var fs = require("fs");
var app = express();
app.listen(9999, function () { return console.log("app running on port 9999"); });
var privateKey = fs.readFileSync('jwtRS256.key');
var publicKey = fs.readFileSync('jwtRS256.key.pub').toString();
app.get("/jwtGenerate", function (req, res) {
    var user = {
        name: "Marko",
        lastname: "Mustac",
        id: 232313123,
        exp: Math.floor(Date.now() / 1000) + (60 * 1)
    };
    res.send(jwt.sign(user, privateKey, { algorithm: 'RS256' }));
});
app.get("/verify/:jwt", function (req, res) {
    var jwtParam = req.params.jwt;
    try {
        var decoded = jwt.verify(jwtParam, publicKey);
        console.log(decoded.exp);
        console.log(Math.floor(Date.now() / 1000));
        if (decoded.exp * 1000 <= Math.floor(Date.now())) {
            console.log("expired");
            throw new Error;
        }
        console.log("all good ma men you authentic");
        res.send("all good ma men you authentic");
    }
    catch (err) {
        console.log("No auth for you ma men");
        res.send("No auth for you ma men");
    }
});
