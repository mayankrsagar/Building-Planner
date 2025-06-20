import Project from '../models/Project.js';

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};
