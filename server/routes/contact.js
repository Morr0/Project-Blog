const express = require("express");
const route = express.Router();

const uuid = require("uuid").v1;

const contact = require("../models/DBModels").Contact;

const sanitizer = require("../utils/sanitizer");

route.post("/feedback", (req, res) => {
    if (!req.headers.question) return res.status(400).end();

    const item = {
        _id: uuid(),
        type: "Feedback",
        question: sanitizer(req.headers.question),
    }

    contact.create(item);
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

    contact.create(item);
    return res.status(200).end();
});


module.exports = route;