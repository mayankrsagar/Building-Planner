import mongoose from 'mongoose';

const annotationSchema = new mongoose.Schema({
  shapeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shape' },
  text: { type: String, required: true },
  position: {
    x: Number,
    y: Number
  }
});

export default mongoose.model('Annotation', annotationSchema);
