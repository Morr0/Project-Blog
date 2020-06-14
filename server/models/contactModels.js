const dynamoose = require("dynamoose");

const contact = new dynamoose.Schema({
    _id: {
        "hashKey": true,
        type: String,
    },
    type: {
        type: String,
        default: "Feedback",
    },
    email: {
        type: String,
        required: true,
    },
    
}, {timestamps: true});

const model = dynamoose.model(process.env.NODE_ENV === "development"? "blog-test-contacts": "blog_contacts", contact);
module.exports = model;