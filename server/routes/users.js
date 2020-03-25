const express = require("express");
const route = express.Router();

const bcrypt = require("bcrypt");
const salt = 11;

const models = require("../models/DBModels");

route.use(express.urlencoded({extended: true}));
route.use(express.json());

function mongoError(res){
    return res.status(500).send("ERROR");
}

// Temporary router
route.get("/", (req, res) => {
    models.User.find((error, docs) => {
        if (error) mongoError();
        else{
            console.log("FREE");
            res.send(docs);
        } 
    });
});

function redirectIfLoggedIn (req, res, next){
    if (req.session){
        res.redirect("../");
    } else next();
}

// TO BE CALLED BEFORE REGISTERING TO CHECK FOR EMAIL AVAILABILITY
route.post("/preregister", redirectIfLoggedIn, (req, res) => {
    console.log("PREREGISTER CALLED");
    if (req.headers.email){
        models.User.find({email: req.headers.email}).exec().
        then(data => {
            if (data.length > 0)
                return res.status(409).json({error: "Exists"});

            return res.status(202).json({error: ""});
        }).catch(error => {
            return res.status(500).json({error: "Mongo Error"});
        })
    }
});

// THIS ASSUMES PREREGISTER IS CALLED RIGHT BEFORE IT
route.post("/register", redirectIfLoggedIn, (req, res) => {
    console.log("REGISTER");
    // Checking if the email is already registered

    if (req.headers.name && req.headers.email && req.headers.password){
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
                else return res.status(201).json({error: ""});
            });
        });
    } else {
        return res.status(400).json({error: "Incomplete request"});
    }

    
});

route.post("/login", redirectIfLoggedIn, (req, res) => {
    console.log("LOGIN");
    if (req.headers.email && req.headers.password){
        models.User.findOne({email: req.headers.email}).exec().then(data => {
            if (!data){
                return res.status(404).json({error: "E-mail or Password are incorrect."});
            } else {
                console.log(data);
                bcrypt.compare(req.headers.password, data.password, (error, same) => {
                    if (!error){
                        if (same){
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

route.post("/logout", 
// Checking if the user is logged in, if not will ask him to login
(req, res, next) => {
    if (req.session){
        next();
    } else {
        res.redirect("/login");
    }
}, // Destroy the cookie
(req, res) => {
    req.session.destroy((error) => {
        if (error) res.status(500).json({error: "Cannot logout"});
        else res.end();
    });
});

module.exports = route;