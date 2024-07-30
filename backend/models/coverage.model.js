import mongoose from 'mongoose'

const coverageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  scoped: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scoped',
    required: true
  }
});

export const Coverage = mongoose.model('Coverage', coverageSchema);