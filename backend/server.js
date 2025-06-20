import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db.js';
import annotationRoutes from './routes/annotationRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import shapeRoutes from './routes/shapeRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/shapes', shapeRoutes);
app.use('/api/annotations', annotationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
