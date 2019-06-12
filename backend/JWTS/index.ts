import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as fs from 'fs';

const app = express();

app.listen(9999, () => console.log("app running on port 9999"))
const privateKey = fs.readFileSync('jwtRS256.key');
const publicKey = fs.readFileSync('jwtRS256.key.pub').toString();

app.get("/jwtGenerate", (req, res) => {
    const user = {
        name: "Marko",
        lastname: "Mustac",
        id: 232313123,
        exp: Math.floor(Date.now() / 1000) + (60 * 1)
    }
    res.send(
        jwt.sign(user, privateKey, { algorithm: 'RS256' })
    )
})

app.get("/verify/:jwt", (req, res) => {

    const jwtParam = req.params.jwt

    try {
        const decoded = jwt.verify(jwtParam, publicKey)
        if (decoded.exp * 1000 <= Math.floor(Date.now())) {
            console.log("expired")
            throw new Error
        }
        console.log("all good ma men you authentic")
        res.send(
            "all good ma men you authentic"
        )
    } catch (err) {
        console.log("No auth for you ma men")
        res.send(
            "No auth for you ma men"
        )
    }

})
