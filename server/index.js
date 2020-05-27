// Imports
const express = require("express");
const morgan = require("morgan");

const helmet = require("helmet");

const parser = require("body-parser");

const cors = require("cors");
const mongoose = require("mongoose");

const AWS = require("aws-sdk");

const session = require("express-session");
// const MongoStore = require("connect-mongo")(session);

// Routes
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

// Inits
require("dotenv").config();

const app = express();
// Constants
const {
    NODE_ENV = "development",
    PORT = 3400,
    SESSION_LIFE = 300000, // 5 mins
    DB_URL,
    SECRET_KEY = "test",

} = process.env;

console.log(NODE_ENV);

// To facilitate production ip from development ip
let ORIGIN = "http://localhost:3000";
if (NODE_ENV === "production"){
    ORIGIN = JSON.parse(process.env.ORIGIN);
} 

require("./utils/db/dbconnection");

console.log(`CORS: ${ORIGIN}`);

// app.use(morgan("common"));

// Connection
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
mongoose.connection.on("connected", () => console.log("Connected"));

app.listen(PORT);

// Middleware

app.use(helmet());

app.use(parser.text({
    type: "text/html",
}));

app.use(cors({
    origin: ORIGIN,
    credentials: true,
}));

app.use(session({
    secret: SECRET_KEY,
    resave: true,
    saveUninitialized: false,
    rolling: true, // Keep session aging from last request
    cookie: {
        secure: "auto",
        httpOnly: true,
        maxAge: Number.parseInt(SESSION_LIFE),
    },
    // store: new MongoStore({
    //     mongooseConnection: mongoose.connection,
    //     collection: "sessions"
    // }),
}));

// Routing 
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// TODO error routing