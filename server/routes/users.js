const express = require("express");
const route = express.Router();

const bcrypt = require("bcrypt");
const salt = 11;

const models = require("../models/DBModels");

route.use(express.urlencoded({extended: true}));
route.use(express.json());

function redirectIfLoggedIn (req, res, next){
    if (req.session.userId){
        res.json({error: "LoggedIn"});
    } else next();
}

route.post("/register", redirectIfLoggedIn, (req, res) => {
    console.log("REGISTER");
    // Checking if the email is already registered

    if (req.headers.name && req.headers.email && req.headers.password){
        // Check for email
        models.User.find({email: req.headers.email}).exec().
        then(data => {
            if (data.length > 0) return res.status(409).json({error: "Exists"});
        }).catch(error => {
            return res.status(500).json({error: error});
        });

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
                if (error) return res.status(500).json({error: error});
                else {  
                    return res.status(201).json({error: ""});
                 }
            });
        });
    } else {
        return res.status(400).json({error: "Incomplete request"});
    }
});

route.post("/login", redirectIfLoggedIn, (req, res) => {
    console.log("LOGIN");
    if (req.headers.email && req.headers.password){
        models.User.findOne({email: req.headers.email}).exec().then(user => {
            if (!user){
                return res.status(404).json({error: "E-mail or Password are incorrect."});
            } else {
                console.log(user);
                bcrypt.compare(req.headers.password, user.password, (error, same) => {
                    if (!error){
                        if (same){
                            req.session.userId = user._id;
                            console.log("Logging in");
                            
                        } else {
                            return res.status(404).json({error: "E-mail or Password are incorrect."});
                        }
                    } else {
                        return res.status(500).json({error: error});
                    }
                });
            }
        });
    } else {
        return res.status(400).json({error: "Incomplete request"});
    }
});

route.post("/logout", (req, res) => {
    if (!req.session.userId)
        return res.status(400).json({error: "You are not logged in the first place"});

    req.session.destroy((error) => {
        if (error) res.status(500).json({error: "Cannot logout"});
        else res.end();
    });
});

module.exports = route;