const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;

const User = new Schema({
    name: {
        type: String,
        required = true
    },
    email: {
        type: String,
        required = true
    },
    password: {
        type: String,
        required = true
    },
    bio: {
        type: String
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
    lastPostDate: {
        type: Date
    },
    lastOnline: {
        type: Date,
        default: Date.now
    }
});

const Post = new Schema({
    author: Objectid,
    title: {
        type: String,
        required = true

    },
    content: {
        type: String,
        required = true
    },
    postDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date
    }
});

