const express = require("express");
const route = express.Router();

const uuid = require("uuid").v1;

const contact = require("../models/DBModels").Contact;

const sanitizer = require("../utils/sanitizer");

const emailer = require("../utils/emailer");

route.post("/feedback", (req, res) => {
    if (!req.headers.question) return res.status(400).end();

    const item = {
        _id: uuid(),
        type: "Feedback",
        question: sanitizer(req.headers.question),
    }

    contact.create(item, (error, data) => {
        if (!error) { // Send an email to me if no error
            emailer("rami@ramihikmat.net", "Feedback from the blog", sanitizer(req.headers.question));
        }
    });
    return res.status(200).end();
});

route.post("/contact", (req, res) => {
    if (!req.headers.email || !req.headers.question)
        return res.status(400).end();

    const item = {
        _id: uuid(),
        type: "Contact",
        email: sanitizer(req.headers.email),
        question: sanitizer(req.headers.question),
    }

    contact.create(item, (error, data) => {
        if (!error) { // Send an email to me if no error
            emailer("rami@ramihikmat.net", `Contact from the blog by email: ${sanitizer(req.headers.email)}`,
             sanitizer(req.headers.question));
        }
    });
    return res.status(200).end();
});


module.exports = route;