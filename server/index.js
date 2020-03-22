// Imports
const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");

// Models
const models = require("./models/DBModels");

// Routes
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

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
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection.on("connected", () => console.log("Connected"));

app.listen(PORT);

// Middleware

app.use(cors());

// Routing 
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

