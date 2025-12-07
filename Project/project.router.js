const express = require("express");

const projectService = require("./proejct.service");

const ProjectRouter = express.Router();

ProjectRouter.post("/", projectService.createProject);

ProjectRouter.get("/", projectService.getProjects);

ProjectRouter.get("/:id", projectService.getProjectById);

ProjectRouter.patch("/:id", projectService.updateProject);

ProjectRouter.delete("/:id", projectService.deleteProject);

ProjectRouter.post("/:id/add-todo", projectService.addTodoToProject);


module.exports = { ProjectRouter };
