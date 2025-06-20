import express from 'express';

import {
  addAnnotation,
  getAnnotationsByShape,
} from '../controllers/annotationController.js';

const router = express.Router();

router.post('/', addAnnotation);
router.get('/:shapeId', getAnnotationsByShape);

export default router;
