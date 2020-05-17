const mongoose = require("mongoose");

const userValidators = require("./validators/users");

const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;

const user = new Schema({
    name: {
        type: String,
        required: true,
        validate: userValidators.nameValidators
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: userValidators.emailValidators,
        // match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: ""
    },
    creationTime: {
        type: Date,
        default: Date.now
    },
    lastPostDate: {
        type: Date
    },
    lastOnline: {
        type: Date
    },
    image_url: {
        type: String,
        default: ""
    }
});

const User = mongoose.model("Users", user);

const post = new Schema({
    author: Objectid,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    draft: {
        type: Boolean,
    },
    // When it goes from draft = false to true
    postDate: {
        type: Date,
        default: Date.now,
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    hidden: {
        type: Boolean,
    },
    likes: {
        type: Number,
        default: 0
    },
    shares: {
        type: Number,
        default: 0
    }
});

const Post = mongoose.model("Posts", post);

exports.User = User;
exports.Post = Post;