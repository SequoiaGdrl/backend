const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", {
    title: String,
    text: String,
    date: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    }
});

module.exports = Comment;