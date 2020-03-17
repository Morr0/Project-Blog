// Imports
const express = require("express");
const cors = require("cors");

// Inits
const app = express();

// Constants
const {
    PORT = 3400
} = process.env;

app.listen(PORT);

// Middleware

app.use(cors());

// Routing 
app.get("/", (req, res) => {
    // res.send("<h1>Hello</h1>");
    let x = [{x:"f"}]
    res.json(x);
});

app.post("/", (req, res) => {
    let x = [{x:"f"}]
    res.json(x);
});

