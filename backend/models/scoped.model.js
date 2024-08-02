import mongoose from 'mongoose'

const scopedSchema = new mongoose.Schema({
  name: {
    type: String,
<<<<<<< Updated upstream
    required: true
  },
  desc: {
    type: String,
    required: true
=======
  },
  desc: {
    type: String,
>>>>>>> Stashed changes
  },
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset',
<<<<<<< Updated upstream
    required: true
  }
});
=======
  }
},{timestamps: true});
>>>>>>> Stashed changes

export const Scoped = mongoose.model('Scoped', scopedSchema);
