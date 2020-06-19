// Imports
const express = require("express");

// Inits
require("dotenv").config();
const app = express();

// Constants
const env = {
    NODE_ENV = "development",
    PORT = 3400,
} = process.env;


// To facilitate production frontend from development's
console.log(NODE_ENV);
let ORIGIN = "http://localhost:3000";
if (NODE_ENV === "production"){
    ORIGIN = JSON.parse(process.env.ORIGIN);
} 
console.log(`CORS: ${ORIGIN}`);

// Initial DB Connection MUST KEEP
require("./utils/db/dbconnection");

app.listen(PORT);

require("./utils/middlewares")(app, env); // Middleware handling
require("./utils/routing")(app); // Routing and error handling

module.exports = app;