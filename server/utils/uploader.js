const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

require("dotenv").config();

// AWS
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const uploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_STORAGE_BUCKET,
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb){
            // If user not signed in or a different user
            if (!req.session.userId) return cb(new Error());
            if (req.headers._id !== req.session.userId) return cb(new Error());

            // Finding the file extension dynamically
            const splitFile = file.originalname.split(".");
            const fileExtension = splitFile[splitFile.length - 1];

            console.log("Image upload");
            cb(null, `${req.session.userId}-profile.${fileExtension}`);
        }
    })
});

module.exports = uploader;