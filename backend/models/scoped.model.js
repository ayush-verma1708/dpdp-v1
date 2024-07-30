import mongoose from 'mongoose'

const scopedSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
    required: true
  }
});

export const Scoped = mongoose.model('Scoped', scopedSchema);
