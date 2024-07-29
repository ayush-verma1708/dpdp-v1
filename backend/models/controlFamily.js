import mongoose from 'mongoose';

const controlFamilySchema = new mongoose.Schema({
  control_Family_Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String }
});

const ControlFamily = mongoose.model('ControlFamily', controlFamilySchema);
export default ControlFamily;
