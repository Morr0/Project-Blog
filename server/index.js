// Imports
const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

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
    SESSION_LIFE = 300,
    DB_URL,
    SECRET_KEY = "test"
} = process.env;

// Connection
const connection = mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.connection.on("connected", () => console.log("Connected"));

app.listen(PORT);

// Middleware

app.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: "sessions"
    }),
    cookie: {
        httpOnly: true,
        maxAge: Number.parseInt(SESSION_LIFE)
    }
}));

app.use(cors());

// Routing 
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// Temporary
app.get("/", (req, res) => {
    console.log(req.session);
    res.end();
});

