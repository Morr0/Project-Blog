// Here is where all middleware before routing happen

const helmet = require("helmet");
const parser = require("body-parser");
const cors = require("cors");
const session = require("express-session");


module.exports = function (app, env){
    app.use(helmet());

    app.use(parser.text({
        type: "text/html",
    }));

    app.use(cors({
        origin: env.ORIGIN,
        credentials: true,
    }));


    app.use(session({
        secret: env.SECRET_KEY,
        resave: true,
        saveUninitialized: false,
        rolling: true, // Keep session aging from last request
        cookie: {
            secure: "auto",
            httpOnly: true,
            maxAge: Number.parseInt(env.SESSION_LIFE),
        },
    }));
}