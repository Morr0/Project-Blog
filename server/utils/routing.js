const usersRouter = require("../routes/users");
const postsRouter = require("../routes/posts");

module.exports = function (app){
    app.use("/users", usersRouter);
    app.use("/posts", postsRouter);
}