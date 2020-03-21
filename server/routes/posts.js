const express = require("express");
const route = express.Router();

const models = require("../models/DBModels");

route.get("/", (req, res) => {
    const posts = models.Post.find((error, data) => {
        res.json(data);
    });
});

route.post("/", (req, res) => {
    const newArticle = new models.Post({
        title: req.headers.title,
        content: req.headers.content
    });
    newArticle.save((error) => {
        if (error) res.status(500);
        else {
            res.send("Added a new post")
        }
    });
});


module.exports = route;