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

const model = dynamoose.model(process.env.NODE_ENV === "development"? "blog-test-contacts": "blog_contacts", contact);
module.exports = model;