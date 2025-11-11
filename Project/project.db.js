const mongo = require("mongoose");

const projectSchema = new mongo.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "No description",
  },
  todos: [
    {
      type: mongo.Schema.Types.ObjectId,
      ref: "todo",
    },
  ],
});

const Project = mongo.model("project", projectSchema);

module.exports = { Project };
