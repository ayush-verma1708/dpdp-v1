import mongoose from 'mongoose'

const assetSchema = new mongoose.Schema({
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
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
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

export const Asset = mongoose.model('Asset', assetSchema);
