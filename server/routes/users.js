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

// TO BE CALLED BEFORE REGISTERING TO CHECK FOR EMAIL AVAILABILITY
route.post("/preregister", (req, res) => {
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
route.post("/register", (req, res) => {
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
        
        }).catch(error => res.status(400).json({error: "Incomplete request"}));
    }

    
});

route.post("/login", (req, res) => {

});




module.exports = route;