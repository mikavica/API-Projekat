const z = require("zod");

const CreateProjectData = z.object({
  name: z.string().min(1, "Project name is required"),  
  description: z.string().optional(),                  
  todos: z.array(z.string()).optional(),              
});


const UpdateProjectData = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  todos: z.array(z.string()).optional(),
});


module.exports = {
  CreateProjectData,
  UpdateProjectData,
};
