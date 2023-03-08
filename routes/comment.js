const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");


router.post("/review", async (req, res) => {

    try {
        const {
            title,
            text,
            date,
            owner,
            gameId
        } = req.body

        const newComment = await new Comment({
            title: title,
            text: text,
            date: date,
            gameId: gameId,
            owner: owner
        });


        const findComment = await Comment.find({
            owner: owner
        }, {
            gameId: gameId
        });

        if (findComment) {
            res.status(400).json({
                message: "error: a comment already exists for this game."
            })
        };




        await newComment.save();

        res.json(newComment);


    } catch (error) {

        res.status(400).json({
            error: error.message
        })

    }


});


router.get("/reviews", async (req, res) => {
    try {
        const {
            gameId
        } = req.query

        const comment = await Comment.find({
            gameId: gameId
        }).populate("owner");


        res.json(comment)




    } catch (error) {

        res.status(400).json({
            error: error.message
        })

    }
});


router.delete("/review/delete", async (req, res) => {
    try {

        await Comment.findByIdAndDelete(req.body.id)

        res.json({
            message: "Review removed"
        })

    } catch (error) {

        res.status(400).json({
            error: error.message
        })




    }
});


router.put("/review/update", async (req, res) => {
    try {

        const comment = await Comment.findById(req.body.id)


        await comment.save()

        res.json(comment)



    } catch (error) {

        res.status(400).json({
            error: error.message
        })


    }
})









module.exports = router;