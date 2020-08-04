// Imports
const express = require("express");

// Inits
require("dotenv").config();
const app = express();

// Constants
const env = {
    PORT = 3400,
    DEV = false
} = process.env;

console.log("Starting");

// Initial DB Connection MUST KEEP
require("./utils/db/dbconnection");

// True when passed by index.js for local testing
if (env.DEV) app.listen(PORT);

require("./utils/middlewares")(app); // Middleware handling
require("./utils/routing")(app); // Routing and error handling

module.exports = app;