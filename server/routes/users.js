const express = require("express");
const route = express.Router();

const bcrypt = require("bcrypt");
const salt = 11;

const models = require("../models/DBModels");

route.use(express.urlencoded({extended: true}));
route.use(express.json());

function checkLoggedIn (req, res, next){
    console.log("CHECK LOGGEDIN");
    if (req.session.userId) {
        console.log(`Session.USERID: ${req.session.userId}`);
        return res.status(208).end();}

    console.log("NOT LOGGED IN");
    next();
}

// Returns whether the user is logged in or not
route.get("/", (req, res) => {
    console.log("Logged In Check CALLED");
    // Not logged in
    if (!req.session.userId) return res.status(200).end();

    // Logged in
    console.log(session.userId);
    return res.status(208).end();
});

route.get("/loggedIn", (req, res) => {
    if (!req.session) if (!res.session.userId) return res.status(404).end();

    models.User.findById(req.session.userId, (error, data) => {
        if (error) return res.status(500).end();

        return res.status(200).json({id: data._id, name: data.name});
    });
});

route.post("/register", checkLoggedIn, (req, res) => {
    console.log("REGISTER");

    if (req.headers.name && req.headers.email && req.headers.password){
        // Check for email
        models.User.find({email: req.headers.email}, (error, data) => {
            if (error) return res.status(500).json({error: error});
            console.log("WASHERE1");
            if (data.length > 0) return res.status(409).end();
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
                        if (error) return res.status(500).json({error: error});
                        else {  
                            return res.status(201).json({error: ""});
                        }
                    });
                });                
            }
        });
    } else {
        return res.status(400).json({error: "Incomplete request"});
    }
});

route.post("/login", checkLoggedIn, (req, res) => {
    console.log("LOGIN REQUEST");
    if (req.headers.email && req.headers.password){
        models.User.findOne({email: req.headers.email}, (error, user) => {
            if (!user){
                console.log("LOGIN REJECTED");
                return res.status(404).json({error: "E-mail or Password are incorrect."});
            } else {
                bcrypt.compare(req.headers.password, user.password, (error, same) => {
                    if (!error){
                        // If login credentials are correct
                        if (same){
                            req.session.userId = user._id;
                            // req.cookies
                            console.log("LOGIN APPROVED");
                            res.status(202).json({id: user._id, name: user.name});
                        } else {
                            console.log("LOGIN REJECTED");
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
    console.log("LOGOUT REQUEST");

    if (!req.session.userId)
        return res.status(400).end();

    req.session.destroy((error) => {
        if (error) return res.status(500).end();

        res.status(202);
        res.clearCookie("connect.sid");
        console.log("Successful LOGOUT");
        return res.end();
    });
});

route.get("/:userId", (req, res) => {
    console.log(`User request: ${req.params.userId}`);
    models.User.findById(req.params.userId, (error, data) => {
        if (error) return res.status(500).end();
        else {
            if (!data) return res.status(404).end();

            return res.status(200).json(data);
        }
    });
})

module.exports = route;