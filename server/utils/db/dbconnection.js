const http = require("https");
const dynamoose = require("dynamoose");

const agent = new http.Agent({
    keepAlive: true,
});

const ddb = new dynamoose.aws.sdk.DynamoDB({
    apiVersion: '2012-08-10', 
    region: "ap-southeast-1",
    httpOptions: {
        agent: agent,
    }
});

dynamoose.aws.ddb.set(ddb);

module.exports = ddb;
