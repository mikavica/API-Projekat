const { Project } = require("./project.db");
const schemas = require("./proejct.schema");

async function createProject(req, res) {
  try {
    const data = schemas.CreateProjectData.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json(data.error);
    }

    const newProject = await Project.create({
      name: data.data.name,
      description: data.data.description,
      todos: data.data.todos || [],
    });

    // Populate todos before returning
    await newProject.populate("todos");
    return res.json(newProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json("something went wrong");
  }
}

async function getProjects(req, res) {
  try {
    const data = await Project.find().populate("todos");
    return res.json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json("something went wrong");
  }
}

async function getProjectById(req, res) {
  try {
    const id = req.params.id.trim();
    const project = await Project.findById(id).populate("todos");

    if (!project) {
      return res.status(404).json("Project not found");
    }

    return res.json(project);
  } catch (error) {
    console.error(error);
    return res.status(500).json("something went wrong");
  }
}

async function updateProject(req, res) {
  try {
    const id = req.params.id.trim();
    const data = schemas.UpdateProjectData.safeParse(req.body);

    if (!data.success) {
      return res.status(400).json(data.error);
    }

    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json("Project not found");
    }

    const updatedProject = await Project.findByIdAndUpdate(id, data.data, {
      new: true,
    }).populate("todos");
    return res.json(updatedProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json("something went wrong");
  }
}

async function deleteProject(req, res) {
  try {
    const id = req.params.id.trim();
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json("Project not found");
    }

    return res.status(200).json("Project successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json("something went wrong");
  }
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
