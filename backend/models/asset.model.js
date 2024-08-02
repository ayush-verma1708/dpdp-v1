import mongoose from 'mongoose'

const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  desc: { type: String },
  isScoped: { type: Boolean, default: false },
  criticality: { type: Boolean, default: false }, // Add criticality field
  businessOwnerName: { type: String },
  businessOwnerEmail: { type: String },
  itOwnerName: { type: String },
  itOwnerEmail: { type: String },
  
},{timestamps: true});

export const Asset = mongoose.model('Asset', assetSchema);
