// Imports
const express = require("express");
const morgan = require("morgan");

const cors = require("cors");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// Routes
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

// Inits
require("dotenv").config();

const app = express();
// Constants
const {
    PORT = 3400,
    SESSION_LIFE = 300000, // 5 mins
    DB_URL,
    SECRET_KEY = "test"
} = process.env;

// app.use(morgan("common"));

// Connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
mongoose.connection.on("connected", () => console.log("Connected"));

app.listen(PORT);

// Middleware

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true,
}));

app.use(session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: false,
    cookie: {
        secure: "auto",
        httpOnly: true,
        maxAge: Number.parseInt(SESSION_LIFE)
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: "sessions"
    }),
}));

// Routing 
app.use("/users", usersRouter);
app.use("/posts", postsRouter);