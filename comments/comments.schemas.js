const z = require("zod");


const CreateCommentData = z.object({
  title: z.string(),
  author: z.string(),
  todoId: z.string(),
});

module.exports = {
  CreateCommentData,
};