const express = require("express");
const route = express.Router();

const models = require("../models/DBModels");

route.use(express.urlencoded({extended: true}));
route.use(express.json());

// Temporary router
route.get("/", (req, res) => {
    models.User.find((error, docs) => {
        if (error) console.log("ERROR");
        else{
            console.log("FREE");
            res.send(docs);
        } 
    });
});




module.exports = route;