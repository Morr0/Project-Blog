const dynamoose = require("dynamoose");

const user = new dynamoose.Schema({
    _id: {
        "hashKey": true,
        type: String,
    },
    name: {
        type: String,
        required: true,
        // validate: userValidators.nameValidators
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate: userValidators.emailValidators,
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
        default: Date.now,
        "rangeKey": true,
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

module.exports = dynamoose.model("Users", user);