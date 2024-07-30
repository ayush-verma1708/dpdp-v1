import mongoose from 'mongoose';

const controlSchema = new mongoose.Schema({
  control_Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  control_Family_Id: { type: String, required: true }
});

const Control = mongoose.model('Control', controlSchema);
export default Control;
