const usersRouter = require("../routes/users");
const postsRouter = require("../routes/posts");

module.exports = function (app){
    app.use("/users", usersRouter);
    app.use("/posts", postsRouter);

    // Incorrect URL handler
    app.use((req, res) => {
        return res.status(400).end();
    });

    app.use((err, req, res, next) => {
        console.error(err);
        return res.status(500).end();
    })
}