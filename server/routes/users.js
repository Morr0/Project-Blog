const express = require("express");
const route = express.Router();

const multer = require("multer");
const uploader = multer({dest: "./uploads/"});

const bcrypt = require("bcrypt");

const salt = 11;
const ALLOWED_TO_REGISTER_USERS = true;

const models = require("../models/DBModels");

route.use(express.urlencoded({extended: true}));
route.use(express.json());

function checkLoggedIn (req, res, next){
    if (req.session.userId) return res.status(208).end();

    next();
}

route.get("/loggedIn", (req, res) => {
    // if (!req.session) return res.status(404).end();
    if (!req.session.userId) return res.status(404).end();

    models.User.findById(req.session.userId, (error, data) => {
        if (error) return res.status(500).end();

        return res.status(200).json({id: data._id, name: data.name});
    });
});

route.get("/allowedToRegister", (req, res) => {
    if (!req.session.userId) return res.status(ALLOWED_TO_REGISTER_USERS? 200: 401).end();

    return res.status(401);
});

route.post("/register", checkLoggedIn, (req, res) => {
    if (!ALLOWED_TO_REGISTER_USERS) return res.status(401).end();

    if (req.headers.name && req.headers.email && req.headers.password){
        // Check for email
        models.User.findOne({email: req.headers.email}, (error, data) => {
            if (error) return res.status(500).end();
            
            // If user exists
            if (data) return res.status(409).end();
            else {
                // Make a new password
                let textPassword = req.headers.password;
                bcrypt.hash(textPassword, salt).then((hash) => {
                    // Storing in DB
                    const user = new models.User({
                        name: req.headers.name,
                        email: req.headers.email,
                        password: hash
                    });

                    user.save((error) => {
                        if (error) return res.status(500).json(error);

                        return res.status(201).end();
                    });
                });                
            }
        });
    } else return res.status(400).end();
});

route.post("/login", checkLoggedIn, (req, res) => {
    if (req.headers.email && req.headers.password){
        models.User.findOne({email: req.headers.email}, (error, user) => {
            if (error) return res.status(500).end();
            // Password or email incorrect
            if (!user) return res.status(404).end();

            else {
                bcrypt.compare(req.headers.password, user.password, (error, same) => {
                    if (!error){
                        // If login credentials are correct
                        if (same){
                            req.session.userId = user._id;
                            res.status(202).json({id: user._id, name: user.name});
                        } else return res.status(404).end();
                    } else return res.status(500).json({error: error});
                });
            }
        });
    } else return res.status(400).json({error: "Incomplete request"});
});

route.post("/logout", (req, res) => {
    if (!req.session.userId) return res.status(400).end();

    // Delete session
    req.session.destroy((error) => {
        if (error) return res.status(500).end();

        res.status(202);
        // Ask browser to delete the cookie
        res.clearCookie("connect.sid");
        return res.end();
    });
});

route.get("/:userId", (req, res) => {
    models.User.findById(req.params.userId, (error, data) => {
        if (error) return res.status(500).end();
        if (!data) return res.status(404).end();
        
        else {
            if (!data) return res.status(404).end();

            return res.status(200).json(data);
        }
    });
});

route.put("/image/profile/:userId", uploader.single("picture"), (req, res) => {
    // TODO NOW Check login
    console.log("Recieved a call");

    if (req.params.userId !== req.session.userId) return res.status(401).end();

    console.log("Image upload request");
    if (req.file) console.log(req.file);


    return res.status(200).end();
});

// route.put("/:userId", checkLoggedIn, (req, res) => {
//     console.log("Called");
//     if (req.session.userId !== req.params.userId) return res.status(401).end();

//     console.log("PAST HERE");
//     models.User.findByIdAndUpdate(req.params.userId, req.body.user, (error, data) => {
//         if (error) return res.status(500).end();

//         return res.status(200).json(data);
//     });
// });

module.exports = route;