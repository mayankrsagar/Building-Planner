import express from 'express';

import {
  addShape,
  getShapesByProject,
} from '../controllers/shapeController.js';

const router = express.Router();

router.post('/', addShape);
router.get('/:projectId', getShapesByProject);

export default router;
