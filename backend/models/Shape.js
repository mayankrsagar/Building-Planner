import mongoose from 'mongoose';

const shapeSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  type: { type: String, enum: ['line', 'rectangle', 'circle'], required: true },
  properties: { type: Object, required: true } // x, y, width, height, radius, etc.
});

export default mongoose.model('Shape', shapeSchema);
