const dynamoose = require("dynamoose");

const post = new dynamoose.Schema({
    _id: {
        "hashKey": true,
        type: String,
    },
    author: {
        type: String,
    },
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
        type: String,
        default: Date.now,
        // "rangeKey": true,
    },
    updateDate: {
        type: String,
        default: Date.now
    },
    hidden: {
        type: Boolean,
    },
    likes: {
        type: Number,
        default: 0
    },
});

const model = dynamoose.model(process.env.NODE_ENV === "development"? "blog-test-posts": "blog-posts", post);
module.exports = model;