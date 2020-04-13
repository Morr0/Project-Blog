const express = require("express");
const route = express.Router();

const models = require("../models/DBModels");

route.get("/", (req, res) => {
    models.Post.find({
        draft: req.headers.draft || false,
        hidden: req.headers.hidden || false
    }, (error, data) => {
        if (error){
            console.log(error);
            return res.json({error: error});
        }

        return res.json(data);
    });
});

route.get("/:id", (req, res) => {
    models.Post.findById(req.params.id, (error, post) => {
        if (error) return res.status(404).end();

        // Whether the requester is allowed to view this page
        if (post.draft || post.hidden){
            if (!req.session) return res.status(401).end();

            if (req.session.id !== post.author) return res.status(401).end();
        }

        return res.status(200).json(post);
    });
});

// Get by a specfic user
route.get("/user/:id", (req, res) => {
    const callback = (error, data) => {
        if (error) return res.status(500).end();

        return res.status(200).json(data);
    };

    if (req.session.userId && req.session.userId === req.params.id){
        console.log("Logged In");
        models.Post.find({author: req.params.id}, callback);
    } else { // Return the non-hidden non-draft work of the user (publicly available posts)
        models.Post.find({author: req.params.id, draft: false, hidden: false}, callback);
    }
});

function checkLoggedIn(req, res, next){
    if (!req.session.userId) return res.status(401).end();

    next();
}

route.post("/", checkLoggedIn, (req, res) => {
    const newArticle = new models.Post({
        author: req.session.userId,
        title: req.headers.title,
        content: req.headers.content,
        draft: req.headers.draft,
        hidden: req.headers.hidden,
    });
    newArticle.save((error, data) => {
        if (error) return err(res, error, 500, "Internal");
         
        return res.status(200).json(data._id);
    });
});

route.put("/:id", checkLoggedIn, (req, res) => {
    // Things that are to be updates, checks if they were included in HTTP header to be updated
    const toBeUpdated = {updateDate: Date.now()};
    if (req.headers.title)
        toBeUpdated.title = req.headers.title;
    if (req.headers.content)
        toBeUpdated.content = req.headers.content;
    if (req.headers.hidden)
        toBeUpdated.hidden = req.headers.hidden;
    if (req.headers.draft){
        toBeUpdated.draft = req.headers.draft;
    }

    if (!req.headers.draft && !req.headers.hidden) toBeUpdated.postDate = Date.now();


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
            return err(res, error);
        } else {
            if (!post)
                return err(res, "The post is not in the system.", 400, "The post is not in the system.")
            return res.json({error: ""});
        }
    });
});

// Like
// Will ignore error as this is not a big deal
route.put("/like/:id", (req, res) => {
    console.log("Liking");
    const update = {$inc: {likes: 1}};
    models.Post.findByIdAndUpdate(req.params.id, update, (error) => {
        if (error) console.log(error);
    }); 
    return res.end();
});

// Share
// Will ignore error as this is not a big deal
route.put("/share/:id", (req, res) => {
    console.log(`Sharing`);
    const update = {$inc: {shares: 1}};
    models.Post.findByIdAndUpdate(req.params.id, update, (error) => {
        if (error) console.log(error);
    });
    return res.end();
});

function err(res, error = "Unauthorized Access", statusCode = 401, message = "Unauthorized Access"){
    console.log(error);
    res.status(statusCode).json({error: message});
}


module.exports = route;