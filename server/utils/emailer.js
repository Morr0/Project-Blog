const aws = require("aws-sdk");
aws.config.update({region: "ap-southeast-2"});

const ses = new aws.SES({ apiVersion: "2010-12-01" });

module.exports = function (to, subject, content){
    const email = {
        Source: "rami@ramihikmat.net",
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: content,
                }
            }
        }
    }

    const sent = ses.sendEmail(email).promise();
    sent
    .then(data => {
        console.log("email submitted to SES", data);
    })
    .catch(error => {
        console.log(error);
    });
}