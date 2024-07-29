import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
  action_Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  control_Id: { type: String, required: true }
});

const Action = mongoose.model('Action', actionSchema);

export default Action;
