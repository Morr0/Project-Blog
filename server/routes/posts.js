const express = require("express");
const route = express.Router();

const models = require("../models/DBModels");

// TODO Error handling

route.get("/", (req, res) => {
    // models.Post.find({
    //     draft: false,
    //     hidden: false
    // }, (error, data) => {
    //     if (error) return res.status(500).end();
    //     if (!data) return res.status(404).end();

    //     // only send needed stuff for better network performance i.e. ignoring the description
    //     data.forEach((element) => {
    //         element.description = "";
    //     });
    //     return res.status(200).json(data);
    // }).sort({postDate: "desc"});

    // return res.json(models.Post.get({_id: "5eafe2b465a90333abd042fa", "postDate": "x"}));

    const {
        amount = 4, // Amount of posts to display
    } = req.headers;

    models.Post.scan().limit(amount).exec((error, data) => {
        if (error) return res.status(500).end();
        if (!data) return res.status(404).end();

        data.map(element => element.content = undefined);
        return res.status(200).json(data);
    });
});

route.get("/:id", async (req, res) => {
    // models.Post.findById(req.params.id, (error, post) => {
    //     if (error || !post) return res.status(404).end();

    //     // Whether the requester is allowed to view this page
    //     if (post.draft || post.hidden){
    //         if (!req.session.userId) return res.status(401).end();
    //         else if (req.session.userId != post.author) return res.status(401).end();
    //     }

    //     return res.status(200).json(post);
    // });

    const post = await models.Post.get({_id: req.params.id});
    if (!post) return res.status(404).end();

    if (post.draft || post.hidden){
        if (!req.session.userId) return res.status(401).end();
        else if (req.session.userId != post.author) return res.status(401).end();
    }

    return res.status(200).json(post);
});

route.get("/user/:id", (req, res) => {
    // const callback = (error, data) => {
    //     if (error) return res.status(500).end();
    //     if (!data) return res.status(404).end();

    //     // only send needed stuff for better network performance i.e. ignoring the description
    //     data.forEach((element) => {
    //         element.description = "";
    //     });
    //     return res.status(200).json(data);
    // };

    // if (req.session.userId && req.session.userId === req.params.id){
    //     models.Post.find({author: req.params.id}, callback).sort({postDate: "desc"});
    // } else { // Return the non-hidden non-draft work of the user (publicly available posts)
    //     models.Post.find({author: req.params.id, draft: false, hidden: false}, callback).sort({postDate: "desc"});
    // }

    // let data = await models.Post.batchGet({_id: req.params.id});
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
    const newArticle = new models.Post({
        author: req.session.userId,
        title: req.headers.title,
        description: req.headers.description,
        content: req.body,
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
    if (req.headers.title) toBeUpdated.title = req.headers.title;
    if (req.headers.description) toBeUpdated.description = req.headers.description;
    if (req.body) toBeUpdated.content = req.body;
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

module.exports = route;