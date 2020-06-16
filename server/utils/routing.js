const postsRouter = require("../routes/posts");
const contactsRouter = require("../routes/contact");

module.exports = function (app){
    app.use("/posts", postsRouter);
    app.use("/contact", contactsRouter);

    // Incorrect URL handler
    app.use((req, res) => {
        return res.status(400).end();
    });

    app.use((err, req, res, next) => {
        console.error(err);
        return res.status(500).end();
    })
}