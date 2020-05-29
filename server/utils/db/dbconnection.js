const AWS = require("aws-sdk");
const http = require("https");
const dynamoose = require("dynamoose");

const agent = new http.Agent({
    keepAlive: true,
});

const ddb = new dynamoose.aws.sdk.DynamoDB({
    apiVersion: '2012-08-10', 
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region: "ap-southeast-1",
    httpOptions: {
        agent: agent,
    }
});

dynamoose.aws.ddb.set(ddb);
