// Imports
const express = require("express");

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
    SESSION_LIFE = 300,
    DB_URL,
    SECRET_KEY = "test"
} = process.env;

// Connection
const connection = mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
mongoose.connection.on("connected", () => console.log("Connected"));

app.listen(PORT);

// Middleware

app.use(cors());

app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: "sessions"
    }),
    cookie: {
        secure: true,
        httpOnly: true,
        maxAge: Number.parseInt(SESSION_LIFE)
    }
}));

// Routing 
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// Temporary
app.get("/", (req, res) => {
    if (req.session.userId)
        return res.json({loggedIn: "hello"});
    else 
        return res.redirect("/users/login");
});

