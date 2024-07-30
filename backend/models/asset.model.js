import mongoose from 'mongoose'

const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  isScoped: {
    type: Boolean,
    required: true
  }
});

export const Asset = mongoose.model('Asset', assetSchema);
