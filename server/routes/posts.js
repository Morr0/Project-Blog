const express = require("express");
const route = express.Router();

const models = require("../models/DBModels");

const uuid = require("uuid").v1;

route.get("/", (req, res) => {
    const {
        amount = 4, // Amount of posts to display
    } = req.headers;

    models.Post.scan().limit(amount).exec((error, data) => {
        if (error) return res.status(500).end();
        if (!data) return res.status(404).end();

        let returnables = [];
            data.forEach((item) => {
                if (!item.hidden && !item.draft){
                    item.content = undefined;
                    returnables.push(item);
                }
            });
        return res.status(200).json(returnables);
    });
});

route.get("/:id", async (req, res) => {
    const post = await models.Post.get({_id: req.params.id});
    if (!post) return res.status(404).end();

    if (post.draft || post.hidden){
        if (!req.session.userId) return res.status(401).end();
        else if (req.session.userId != post.author) return res.status(401).end();
    }

    return res.status(200).json(post);
});

route.get("/user/:id", (req, res) => {
    // Bear in mind this does only retrieve my user's items
    models.Post.scan().exec((error, data) => {
        if (req.session.userId && req.session.userId === req.params.id){ // If authorised to see all the user's documents when logged in
            data.forEach(item => item.content = undefined);
            return res.status(200).json(data);
        } else { // Public posts
            let returnables = [];
            data.forEach((item) => {
                if (!item.hidden && !item.draft){
                    item.content = undefined;
                    returnables.push(item);
                }
            });

            return res.status(200).json(returnables);
        }
     });
    
});

function checkLoggedIn(req, res, next){
    if (!req.session.userId) return res.status(401).end();

    next();
}

route.post("/", checkLoggedIn, (req, res) => {
    const newArticle = {
        _id: uuid(),
        author: req.session.userId,
        title: req.headers.title,
        description: req.headers.description,
        content: req.body,
        draft: stringToBoolean(req.headers.draft),
        hidden: stringToBoolean(req.headers.hidden),
    };

    models.Post.create(newArticle, (error, data) => {
        if (error){ 
            console.log(error);
            return res.status(500).end();
        }
         
        return res.status(200).json(data._id);
    });
});

route.put("/:id", checkLoggedIn, (req, res) => {
    // Things that are to be updated, checks if they were included in HTTP header to be updated

    console.log(`hidden: ${req.headers.hidden} and type: ${typeof req.headers.hidden}`);
    
    const toBeUpdated = {};
    if (req.headers.title) toBeUpdated.title = req.headers.title;
    if (req.headers.description) toBeUpdated.description = req.headers.description;
    if (req.body) toBeUpdated.content = req.body;
    if (req.headers.hidden) toBeUpdated.hidden = stringToBoolean(req.headers.hidden);
    if (req.headers.draft) toBeUpdated.draft = stringToBoolean(req.headers.draft);

    models.Post.update({_id: req.params.id}, toBeUpdated, (error, post) => {
        if (error) return res.status(500).end();
            
        res.status(200).end();
    });
});

route.delete("/:id", checkLoggedIn, (req, res) => {
    models.Post.delete({_id: req.params.id}, (error, post) => {
        if (error) return res.status(500).end();

        // if (!post) return res.status(400).end();

        return res.status(200).end();
    });
});

route.put("/like/:id", async (req, res) => {
    // Get the current post, increment the likes and update the table
    // THIS IS INEFFICIENT BECAUSE OF DID NOT FIND A WAY TO AUTO_INCREMENT IN DYNAMOOSE
    const post = await models.Post.get({_id: req.params.id});
    if (!post) return res.status(400).end();

    await models.Post.update({_id: req.params.id}, {likes: ++post.likes});
    return res.status(200).end();
});

// Utils

// Returns false if undefined or null
function stringToBoolean(str){
    if (!str) return false;

    return str.includes("true")? true: false;
}

module.exports = route;