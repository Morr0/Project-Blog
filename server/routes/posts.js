const express = require("express");
const route = express.Router();

const models = require("../models/DBModels");

const createDomPurify = require("dompurify");
const {JSDOM} = require("jsdom");
const window = (new JSDOM("")).window;
const DOMPurify = createDomPurify(window);


route.get("/", (req, res) => {
    models.Post.find({
        draft: false,
        hidden: false
    }, (error, data) => {
        if (error) return res.status(500).end();

        return res.status(200).json(data);
    });
});

route.get("/:id", (req, res) => {
    models.Post.findById(req.params.id, (error, post) => {
        if (error) return res.status(404).end();

        // Whether the requester is allowed to view this page
        if (post.draft || post.hidden){
            if (!req.session.userId) return res.status(401).end();
            else if (req.session.userId != post.author) return res.status(401).end();
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
        title: cleanHTML(req.headers.title),
        content: cleanHTML(req.headers.content),
        draft: req.headers.draft,
        hidden: req.headers.hidden,
    });
    newArticle.save((error, data) => {
        if (error) return res.status(500).end();
         
        return res.status(200).json(data._id);
    });
});

route.put("/:id", checkLoggedIn, (req, res) => {
    // Things that are to be updates, checks if they were included in HTTP header to be updated
    const toBeUpdated = {updateDate: Date.now()};
    if (req.headers.title) toBeUpdated.title = cleanHTML(req.headers.title);
    if (req.headers.content) toBeUpdated.content = cleanHTML(req.headers.content);
    if (req.headers.hidden) toBeUpdated.hidden = req.headers.hidden;
    if (req.headers.draft) toBeUpdated.draft = req.headers.draft;

    if (!req.headers.draft && !req.headers.hidden) toBeUpdated.postDate = Date.now();

    models.Post.findByIdAndUpdate(req.params.id, toBeUpdated, (error) => {
        if (error) return res.status(500).end();
            
        res.status(200).end();
    });
});

route.delete("/:id", checkLoggedIn, (req, res) => {
    models.Post.findByIdAndRemove(req.params.id, (error, post) => {
        if (error) return res.status(500).end();

        if (!post) return res.status(400).end();

        return res.status(200).end();
    });
});

// Like
route.put("/like/:id", (req, res) => {
    const update = {$inc: {likes: 1}};
    models.Post.findByIdAndUpdate(req.params.id, update, (error) => {
        if (error) return res.status(500).end();
    }); 

    return res.status(200).end();
});

// Share
// Will ignore error as this is not a big deal
// route.put("/share/:id", (req, res) => {
//     console.log(`Sharing`);
//     const update = {$inc: {shares: 1}};
//     models.Post.findByIdAndUpdate(req.params.id, update, (error) => {
//         if (error) console.log(error);
//     });
//     return res.end();
// });

// Util
function cleanHTML(content){
    return DOMPurify.sanitize(content);
}

module.exports = route;