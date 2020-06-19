// Here is where all middleware before routing happen

const helmet = require("helmet");
const parser = require("body-parser");

module.exports = function (app, env){
    app.use(helmet());

    app.use(parser.text({
        type: "text/html",
    }));
}