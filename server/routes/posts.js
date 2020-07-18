const express = require("express");
const route = express.Router();

const models = require("../models/DBModels");

route.get("/", (req, res) => {
    // const {
    //     amount = 4, // Amount of posts to display
    // } = req.headers;

    models.Post.scan().exec((error, data) => {
        if (error) return res.status(500).end();
        if (!data) return res.status(404).end();

        // let returnables = [];
        // data.forEach((item) => {
        //     if (!item.hidden && !item.draft){
        //         item.content = undefined;
        //         returnables.push(item);
        //     }
        // });
        // return res.status(200).json(returnables);
        return res.status(200).json(data);
    });
});

route.get("/:id", async (req, res) => {
    const post = await models.Post.get({_id: req.params.id});
    if (!post) return res.status(404).end();

    // if (post.draft || post.hidden){
    //     if (!req.session.userId) return res.status(401).end();
    //     else if (req.session.userId != post.author) return res.status(401).end();
    // }

    return res.status(200).json(post);
});

module.exports = route;