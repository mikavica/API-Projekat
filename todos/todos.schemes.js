const z = require("zod");

const CreateTodoData = z.object({
  title: z.string(),
});

module.exports = {
  CreateTodoData,
};
