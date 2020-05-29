const express = require("express");
const route = express.Router();

const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

require("dotenv").config();

// AWS
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

// TODO Error Handling

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
            if (req.params.userId !== req.session.userId) return cb(new Error());

            // Finding the file extension dynamically
            const splitFile = file.originalname.split(".");
            const fileExtension = splitFile[splitFile.length - 1];

            cb(null, `${req.session.userId}-profile.${fileExtension}`);
        }
    })
});


const bcrypt = require("bcrypt");

const salt = 11;
const ALLOWED_TO_REGISTER_USERS = true;

const models = require("../models/DBModels");

route.use(express.urlencoded({extended: true}));
route.use(express.json());

function checkLoggedIn (req, res, next){
    if (req.session.userId) return res.status(208).end();

    next();
}

route.get("/loggedIn", async (req, res) => {
    // if (!req.session) return res.status(404).end();
    if (!req.session.userId) return res.status(404).end();

    const data = await models.User.get({_id: req.session.userId});
    return res.status(200).json({id: data._id, name: data.name});
    // models.User.findById(req.session.userId, (error, data) => {
    //     if (error) return res.status(500).end();

    //     return res.status(200).json({id: data._id, name: data.name});
    // });
});

// Currently not registering
// route.get("/allowedToRegister", (req, res) => {
//     if (!req.session.userId) return res.status(ALLOWED_TO_REGISTER_USERS? 200: 401).end();

//     return res.status(401);
// });

// route.post("/register", checkLoggedIn, (req, res) => {
//     if (!ALLOWED_TO_REGISTER_USERS) return res.status(401).end();

//     if (req.headers.name && req.headers.email && req.headers.password){
//         // Check for email
//         models.User.findOne({email: req.headers.email}, (error, data) => {
//             if (error) return res.status(500).end();
            
//             // If user exists
//             if (data) return res.status(409).end();
//             else {
//                 // Make a new password
//                 let textPassword = req.headers.password;
//                 bcrypt.hash(textPassword, salt).then((hash) => {
//                     // Storing in DB
//                     const user = new models.User({
//                         name: req.headers.name,
//                         email: req.headers.email,
//                         password: hash
//                     });

//                     user.save((error) => {
//                         if (error) return res.status(500).json(error);

//                         return res.status(201).end();
//                     });
//                 });                
//             }
//         });
//     } else return res.status(400).end();
// });

route.post("/login", checkLoggedIn, async (req, res) => {
    // if (req.headers.email && req.headers.password){
    //     models.User.findOne({email: req.headers.email}, (error, user) => {
    //         if (error) return res.status(500).end();
    //         // Password or email incorrect
    //         if (!user) return res.status(404).end();

    //         else {
    //             bcrypt.compare(req.headers.password, user.password, (error, same) => {
    //                 if (!error){
    //                     // If login credentials are correct
    //                     if (same){
    //                         req.session.userId = user._id;
    //                         res.status(202).json({id: user._id, name: user.name});
    //                     } else return res.status(404).end();
    //                 } else return res.status(500).json({error: error});
    //             });
    //         }
    //     });
    // } else return res.status(400).json({error: "Incomplete request"});

    if (req.headers.email && req.headers.password){
        models.User.scan().filter("email").eq(req.headers.email).exec((error, user) => {
            if (error) return res.status(500).end();
            // Password or email incorrect
            if (!user) return res.status(404).end();
            
            // Hashing magic
            user = user[0]; // returns array
            bcrypt.compare(req.headers.password, user.password, (error, same) => {
                if (!error){
                    // If login credentials are correct
                    if (same){
                        req.session.userId = user._id;
                        res.status(202).json({id: user._id, name: user.name});
                    } else return res.status(404).end();
                } else {
                    console.log(error);
                    return res.status(500).end();
                }
            });
        });
    } else {
        return res.status(400).end();
    }
});

route.post("/logout", (req, res) => {
    if (!req.session.userId) return res.status(400).end();

    // Delete session
    req.session.destroy((error) => {
        if (error) return res.status(500).end();

        res.status(202);
        // Ask browser to delete the cookie
        res.clearCookie("connect.sid");
        return res.end();
    });
});

route.get("/:id", async (req, res) => {
    // models.User.findById(req.params.userId, (error, data) => {
    //     if (error) return res.status(500).end();
    //     if (!data) return res.status(404).end();
        
    //     else {
    //         if (!data) return res.status(404).end();

    //         return res.status(200).json(data);
    //     }
    // });

    const user = await models.User.get({_id: req.params.id});
    if (!user) return res.status(404).end();

    user.email = user.password = undefined;

    return res.status(200).json(user);
});

route.put("/image/profile/:id", uploader.single("picture"), async (req, res) => {
    // Updating the database with the url of the image
    // models.User.findByIdAndUpdate(req.session.userId, {image_url: req.file.location}, (error, data) => {
    //     if (error) return res.status(500);

    //     return res.status(200).end();
    // });
    if (req.session.userId !== req.params.id) return res.status(401).end();

    const user = await models.User.update({_id: req.params.id});
    if (!user) return res.status(400).end();

    return res.status(200).end();
});

route.put("/:id", checkLoggedIn, async (req, res) => {
//     console.log("Called");
//     if (req.session.userId !== req.params.userId) return res.status(401).end();

//     console.log("PAST HERE");
//     models.User.findByIdAndUpdate(req.params.userId, req.body.user, (error, data) => {
//         if (error) return res.status(500).end();

//         return res.status(200).json(data);
//     });

    if (req.session.userId !== req.params.id) return res.status(401).end();

    const user = await models.User.update({_id: req.params.id}, req.body.user);
    if (!user) return res.status(500).end();

    return res.status(200).json(user);
});

module.exports = route;