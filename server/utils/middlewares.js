// Here is where all middleware before routing happen

const helmet = require("helmet");
const parser = require("body-parser");
const cors = require("cors");

module.exports = function (app, env){
    app.use(helmet());

    app.use(parser.text({
        type: "text/html",
    }));

    app.use(cors({
        origin: JSON.parse(env.ORIGIN),
        credentials: true,
    }));
}