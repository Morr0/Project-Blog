const dynamoose = require("dynamoose");

const contact = new dynamoose.Schema({
    _id: {
        "hashKey": true,
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    question: {
        type: String,
    },
    
}, {timestamps: true});

const model = dynamoose.model("blog_contacts", contact);
module.exports = model;