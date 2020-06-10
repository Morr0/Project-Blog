// Here is where all middleware before routing happen

const helmet = require("helmet");
const parser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const dynamoDBClient = require("./db/dbconnection");


module.exports = function (app, env){
    app.use(helmet());

    app.use(parser.text({
        type: "text/html",
    }));

    app.use(cors({
        origin: JSON.parse(env.ORIGIN),
        credentials: true,
    }));

    var DynamoDBStore = require('connect-dynamodb')({session: session});
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
        store: new DynamoDBStore({
            client: dynamoDBClient,
            table: "blog-sessions",
            hashKey: "_id",
        }),
    }));
}