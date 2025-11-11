const express = require("express");
const commentservice = require("./comments.service")

const CommentsRouter = express.Router();

CommentsRouter.post("/",commentservice.createComment);
CommentsRouter.get("/:id",commentservice.getComment);
CommentsRouter.delete("/:id",commentservice.deleteComment);
CommentsRouter.patch("/:id",commentservice.updateComment);

module.exports = {
    CommentsRouter
}