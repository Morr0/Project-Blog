const express = require("express");
const route = express.Router();

const models = require("../models/DBModels");

route.get("/", (req, res) => {
    const {
        draft = false,
        author,
        hidden = false
    } = req.headers;

    // So only logged in users can access
    if (draft && !req.session.userId){
        return err(res);
    }

    models.Post.find({},(error, data) => {
        if (error){
            console.log(error);
            return res.json({error: error});
        }

        res.json(data);
    });
});

route.get("/:id", (req, res) => {
    console.log("REQUEST");
    models.Post.find({_id: req.params.id},(error, data) => {
        res.json(data);
    });
});

route.get("/draft", (req, res) => {
    const posts = models.Post.find({draft: true},(error, data) => {
        res.json(data);
    });
});

function checkLoggedIn(req, res, next){
    if (!req.session.userId){
        return err(res);
    }

    next();
}

route.post("/", checkLoggedIn, (req, res) => {
    const newArticle = new models.Post({
        author: req.session.userId,
        title: req.headers.title,
        content: req.headers.content
    });
    newArticle.save((error) => {
        if (error) return err(res, error, 500, "Internal");
        else {
            res.send("Added a new post")
        }
    });
});

route.put("/:id", checkLoggedIn, (req, res) => {
    // Things that are to be updates, checks if they were included in HTTP header to be updated
    const toBeUpdated = {};
    if (req.headers.title)
        toBeUpdated.title = req.headers.title;
    if (req.headers.content)
        toBeUpdated.content = req.headers.content;
    if (req.headers.hidden)
        toBeUpdated.hidden = req.headers.hidden;
    if (req.headers.draft){
        toBeUpdated.draft = req.headers.draft;
        // logic
        toBeUpdated.postDate = Date.now();
        toBeUpdated.updateDate = Date.now();
    }

    models.Post.findByIdAndUpdate(req.params.id, toBeUpdated, (error, post) => {
        if (error){
            err(res, error);
        } else {
            res.json({error: ""});
        }
    });
});

route.delete("/:id", (req, res) => {
    models.Post.findByIdAndRemove(req.params.id, (error, post) => {
        if (error){
            err(res, error);
        } else {
            if (!post)
                return err(res, "The post is not in the system.", 400, "The post is not in the system.")
            res.json({error: ""});
        }
    });
});

function err(res, error = "Unauthorized Access", statusCode = 401, message = "Unauthorized Access"){
    console.log(error);
    res.status(statusCode).json({error: message});
}


module.exports = route;