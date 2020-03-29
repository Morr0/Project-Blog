const express = require("express");
const route = express.Router();

const models = require("../models/DBModels");

route.get("/", (req, res) => {
    console.log("REQUEST");
    models.Post.find({},(error, data) => {
        console.log("SENDING DATA");
        res.json(data);
    });
});

route.get("/:id", (req, res) => {
    console.log("REQUEST");
    models.Post.find({_id: req.params.id},(error, data) => {
        console.log(data);
        res.json(data);
    });
});

route.get("/draft", (req, res) => {
    const posts = models.Post.find({draft: true},(error, data) => {
        res.json(data);
    });
});

route.post("/", (req, res) => {
    // TODO make sure to grab the user id for the post 
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