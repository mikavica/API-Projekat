const mongo = require("mongoose");
const commentSchema = new mongo.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "Neko",
  },
  todoId: {
    type: mongo.Schema.Types.ObjectId,
    ref: "todo",
    required: true,
  },
});
const Comment = mongo.model("comment", commentSchema);
module.exports = {
    Comment,
};