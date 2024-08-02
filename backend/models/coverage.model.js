import mongoose from 'mongoose'

const coverageSchema = new mongoose.Schema({
  coverageCount: {
    type: Number,
    default: 0,
  },
  scoped: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scoped',
    default: null
  }
},{ timestamps: true
});

export const Coverage = mongoose.model('Coverage', coverageSchema);