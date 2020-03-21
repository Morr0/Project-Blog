const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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

const User = mongoose.model("Users", user);

const post = new Schema({
    author: Objectid,
    title: {
        type: String,
        required: true

    },
    content: {
        type: String,
        required: true
    },
    draft: {
        type: Boolean,
        default: false
    },
    postDate: {
        type: Date
    },
    updateDate: {
        type: Date
    },
    hidden: {
        type: Boolean,
        default: false
    }
});

const Post = mongoose.model("Posts", post);

exports.User = User;
exports.Post = Post;