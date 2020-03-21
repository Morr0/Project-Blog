// Imports
const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");

const models = require("./models/DBModels");

// Inits
require("dotenv").config();

const app = express();
// Constants
const {
    PORT = 3400,
    DB_URL
} = process.env;

console.log(process.env.PORT);

// Connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on("connected", () => console.log("Connected"));

user1.save();

app.listen(PORT);

// Middleware

app.use(cors());

// Routing 
app.get("/", (req, res) => {
    // res.send("<h1>Hello</h1>");
    let x = [{x:"f"}]
    res.json(x);
});

// Temporary router
app.get("/users", (req, res) => {
    models.User.find((error, docs) => {
        if (error) console.log("ERROR");
        else{
            console.log("FREE");
            res.send(docs);
        } 
    });
});

app.post("/", (req, res) => {
    let x = [{x:"f"}]
    res.json(x);
});

