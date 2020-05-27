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
        type: Date,
        default: Date.now,
        "rangeKey": true,
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

module.exports = dynamoose.model("Posts", post);