import mongoose from 'mongoose';
import Control from './control.js'; 

const controlFamilySchema = new mongoose.Schema({
  FixedID: { type: String, unique: true },
  control_Family_Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  isDPDPA: { type: Boolean, default: 0 }, // New field,
  info: {
    controlsCount: { type: Number, default: 0 },
    actionsCount: { type: Number, default: 0 }
  }

});

controlFamilySchema.pre('remove', async function(next) {
  try {
    const controls = await Control.find({ control_Family_Id: this._id });
    for (const control of controls) {
      await control.remove();
    }
    next();
  } catch (err) {
    next(err);
  }
});


const ControlFamily = mongoose.model('ControlFamily', controlFamilySchema);
export default ControlFamily;
