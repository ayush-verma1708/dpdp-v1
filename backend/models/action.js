import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
  FixedID: { type: String, unique: true },
  action_Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  control_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Control', required: true },
  isDPDPA: { type: Boolean, default: 0 },
  info: {
    totalActions: { type: Number, default: 0 }
  },
  isCompleted: { type: Boolean, default: 0 }, // Added field
});

const Action = mongoose.model('Action', actionSchema);

export default Action;

// import mongoose from 'mongoose';

// const actionSchema = new mongoose.Schema({
//   FixedID: { type: String, unique: true },
//   action_Id: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   description: { type: String },
//   control_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Control', required: true },
//   isDPDPA: { type: Boolean, default: 0 } ,
//   info: {
//     totalActions: { type: Number, default: 0 }
//   }
// });

// const Action = mongoose.model('Action', actionSchema);

// export default Action;
