const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64")

router.post("/login", async (req, res) => {

    try {


        const {
            email,
            password

        } = req.body

        console.log(email)
        const userLogin = await User.findOne({
            email: email
        });

        if (!userLogin) {
            res.status(401).json({
                message: "User not found"
            });
        }


        const hash2 = SHA256(userLogin.salt + password).toString(encBase64);

        if (hash2 === userLogin.hash) {
            res.json(userLogin)
        } else {
            res.json({
                message: "bad password"
            })
        }





    } catch (error) {

        res.status(400).json({
            error: error.message
        })

    }

});


module.exports = router;