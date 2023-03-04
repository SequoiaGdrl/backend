const mongoose = require("mongoose");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");


const User = mongoose.model("User", {
    username: String,
    email: String,
    token: String,
    hash: String,
    salt: String,
    avatar: Object,




});

module.exports = User;