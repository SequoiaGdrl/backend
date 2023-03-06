const express = require("express");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const User = require("../models/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");


cloudinary.config({
    cloud_name: "dfq0pxmkj",
    api_key: "181681133975499",
    api_secret: "A2tjQnvaDLL1XJjnqGX2rOjGT7s",
    secure: true,

})

const convertToBase64 = (file) => {
    return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};




router.post("/signup", fileUpload(), async (req, res) => {

    try {

        const {
            username,
            email,
            password,
            confirmPassword,
        } = req.body;



        const salt = uid2(16);
        const hash = SHA256(salt + password).toString(encBase64)
        const token = uid2(16);

        if (!username) {
            return res.status(400).json({
                message: "error: username is not inform"
            })
        };

        if (!email) {
            return res.status(400).json({
                message: "error: email is not inform"
            })

        }

        if (!password) {
            return res.status(400).json({
                message: "error: password is not inform"
            })

        }

        if (!confirmPassword) {
            return res.status(400).json({
                message: "error: confirmPassword is not inform"
            })

        };

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "error: password and confirmPassword are not the same"
            })
        }



        const user = await User.findOne({
            email: email

        })

        if (user) {
            return res.status(400).json({
                message: "This email already has an account"
            })
        }

        const avatar = await cloudinary.uploader.upload(
            convertToBase64(req.files.picture), {
                folder: "/image-gamePad"
            }
        );


        const newUser = await User({
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            token: token,
            hash: hash,
            salt: salt,
            avatar: avatar

        })

        await newUser.save();

        res.json(newUser)



    } catch (error) {

        res.status(400).json({
            error: error.message
        })

    }

});

module.exports = router;