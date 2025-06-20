import Shape from '../models/Shape.js';

export const addShape = async (req, res) => {
  try {
    const shape = await Shape.create(req.body);
    res.status(201).json(shape);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getShapesByProject = async (req, res) => {
  const shapes = await Shape.find({ projectId: req.params.projectId });
  res.json(shapes);
};
