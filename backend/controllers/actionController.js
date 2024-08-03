// controllers/actionController.js
import Action from '../models/action.js';
import Control from '../models/control.js';
import { getNextActionId } from '../utils/autoIncrementId.js';

// Helper function to update info field in Control
const updateControlInfo = async (controlId) => {
  const control = await Control.findById(controlId);
  if (!control) return;

  const actionsCount = await Action.countDocuments({ control_Id: controlId });

  control.info.actionsCount = actionsCount;

  await control.save();
};

// Helper function to update info field in ControlFamily
const updateControlFamilyInfo = async (controlFamilyId) => {
  const controlFamily = await ControlFamily.findById(controlFamilyId);
  if (!controlFamily) return;

  const controls = await Control.find({ control_Family_Id: controlFamilyId });
  const actionsCount = await Action.countDocuments({ control_Id: { $in: controls.map(c => c._id) } });

  controlFamily.info.controlsCount = controls.length;
  controlFamily.info.actionsCount = actionsCount;

  await controlFamily.save();
};

export const getActions = async (req, res) => {
  try {
    const actions = await Action.find().populate('control_Id', 'name');
    res.json(actions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching actions' });
  }
};

export const createAction = async (req, res) => {
  try {
    const { control_Id } = req.body;

    const control = await Control.findById(control_Id);
    if (!control) {
      return res.status(400).json({ message: 'Control does not exist' });
    }

    const FixedID = await getNextActionId();
    const action = new Action({
      FixedID,
      action_Id: req.body.action_Id,
      name: req.body.name,
      description: req.body.description,
      control_Id,
      isDPDPA: req.body.isDPDPA || 0
    });

    await action.save();

    // Update info field in Control
    await updateControlInfo(control_Id);

    // Update info field in ControlFamily
    const controlFamily = await ControlFamily.findById(control.control_Family_Id);
    if (controlFamily) {
      await updateControlFamilyInfo(controlFamily._id);
    }

    res.status(201).json(action);
  } catch (error) {
    res.status(400).json({ message: 'Error creating action' });
  }
};

export const updateAction = async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Action.findById(id);
    if (action.isDPDPA) {
      return res.status(403).json({ message: 'Cannot edit an action with isDPDPA set to 1' });
    }
    const updatedAction = await Action.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAction) {
      return res.status(404).json({ message: 'Action not found' });
    }

    // Update info field in Control
    await updateControlInfo(updatedAction.control_Id);

    // Update info field in ControlFamily
    const control = await Control.findById(updatedAction.control_Id);
    if (control) {
      const controlFamily = await ControlFamily.findById(control.control_Family_Id);
      if (controlFamily) {
        await updateControlFamilyInfo(controlFamily._id);
      }
    }

    res.json(updatedAction);
  } catch (error) {
    res.status(400).json({ message: 'Error updating action' });
  }
};

export const deleteAction = async (req, res) => {
  try {
    const { id } = req.params;
    const action = await Action.findById(id);
    if (action.isDPDPA) {
      return res.status(403).json({ message: 'Cannot delete an action with isDPDPA set to 1' });
    }
    const deletedAction = await Action.findByIdAndDelete(id);
    if (!deletedAction) {
      return res.status(404).json({ message: 'Action not found' });
    }

    // Update info field in Control
    await updateControlInfo(deletedAction.control_Id);

    // Update info field in ControlFamily
    const control = await Control.findById(deletedAction.control_Id);
    if (control) {
      const controlFamily = await ControlFamily.findById(control.control_Family_Id);
      if (controlFamily) {
        await updateControlFamilyInfo(controlFamily._id);
      }
    }

    res.json({ message: 'Action deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting action' });
  }
};

// // controllers/actionController.js
// import Action from '../models/action.js';
// import Control from '../models/control.js';
// import { getNextActionId } from '../utils/autoIncrementId.js';

// export const getActions = async (req, res) => {
//   try {
//     const actions = await Action.find().populate('control_Id', 'name');
//     res.json(actions);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching actions' });
//   }
// };

// export const createAction = async (req, res) => {
//   try {
//     const { control_Id } = req.body;

//     const control = await Control.findById(control_Id);
//     if (!control) {
//       return res.status(400).json({ message: 'Control does not exist' });
//     }

//     const FixedID = await getNextActionId();
//     const action = new Action({
//       FixedID,
//       action_Id: req.body.action_Id,
//       name: req.body.name,
//       description: req.body.description,
//       control_Id,
//       isDPDPA: req.body.isDPDPA || 0 // Default to 0 if not provided
//     });

//     await action.save();
//     res.status(201).json(action);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating action' });
//   }
// };

// export const updateAction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const action = await Action.findById(id);
//     if (action.isDPDPA) {
//       return res.status(403).json({ message: 'Cannot edit an action with isDPDPA set to 1' });
//     }
//     const updatedAction = await Action.findByIdAndUpdate(id, req.body, { new: true });
//     if (!updatedAction) {
//       return res.status(404).json({ message: 'Action not found' });
//     }
//     res.json(updatedAction);
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating action' });
//   }
// };

// export const deleteAction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const action = await Action.findById(id);
//     if (action.isDPDPA) {
//       return res.status(403).json({ message: 'Cannot delete an action with isDPDPA set to 1' });
//     }
//     const deletedAction = await Action.findByIdAndDelete(id);
//     if (!deletedAction) {
//       return res.status(404).json({ message: 'Action not found' });
//     }
//     res.json({ message: 'Action deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting action' });
//   }
// };

// // // controllers/actionController.js
// // import Action from '../models/action.js';
// // import Control from '../models/control.js';
// // import { getNextActionId } from '../utils/autoIncrementId.js';

// // export const getActions = async (req, res) => {
// //   try {
// //     const actions = await Action.find().populate('control_Id', 'name');
// //     res.json(actions);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error fetching actions' });
// //   }
// // };

// // export const createAction = async (req, res) => {
// //   try {
// //     const { control_Id } = req.body;

// //     const control = await Control.findById(control_Id);
// //     if (!control) {
// //       return res.status(400).json({ message: 'Control does not exist' });
// //     }

// //     const FixedID = await getNextActionId();
// //     const action = new Action({
// //       FixedID,
// //       action_Id: req.body.action_Id,
// //       name: req.body.name,
// //       description: req.body.description,
// //       control_Id
// //     });

// //     await action.save();
// //     res.status(201).json(action);
// //   } catch (error) {
// //     res.status(400).json({ message: 'Error creating action' });
// //   }
// // };

// // export const updateAction = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const action = await Action.findByIdAndUpdate(id, req.body, { new: true });
// //     if (!action) {
// //       return res.status(404).json({ message: 'Action not found' });
// //     }
// //     res.json(action);
// //   } catch (error) {
// //     res.status(400).json({ message: 'Error updating action' });
// //   }
// // };

// // export const deleteAction = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const action = await Action.findByIdAndDelete(id);
// //     if (!action) {
// //       return res.status(404).json({ message: 'Action not found' });
// //     }
// //     res.json({ message: 'Action deleted successfully' });
// //   } catch (error) {
// //     res.status(500).json({ message: 'Error deleting action' });
// //   }
// // };

// // // import Action from '../models/action.js';
// // // import Control from '../models/control.js';
// // // import { getNextActionId } from '../utils/autoIncrementId.js';

// // // export const getActions = async (req, res) => {
// // //   try {
// // //     const actions = await Action.find().populate('control_Id', 'name');
// // //     res.json(actions);
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Error fetching actions' });
// // //   }
// // // };

// // // export const createAction = async (req, res) => {
// // //   try {
// // //     const { control_Id } = req.body;

// // //     // Check if the control exists
// // //     const control = await Control.findById(control_Id);
// // //     if (!control) {
// // //       return res.status(400).json({ message: 'Control does not exist' });
// // //     }

// // //     const FixedID = await getNextActionId();
// // //     const action = new Action({
// // //       FixedID,
// // //       VariableID: req.body.VariableID || FixedID,
// // //       desc: req.body.desc,
// // //       control_Id,
// // //       // other fields from req.body
// // //     });

// // //     await action.save();
// // //     res.status(201).json(action);
// // //   } catch (error) {
// // //     res.status(400).json({ message: 'Error creating action' });
// // //   }
// // // };

// // // // export const createAction = async (req, res) => {
// // // //   try {
// // // //     const { control_Id } = req.body;

// // // //     // Check if the control exists
// // // //     const control = await Control.findById(control_Id);
// // // //     if (!control) {
// // // //       return res.status(400).json({ message: 'Control does not exist' });
// // // //     }

// // // //     const action = new Action(req.body);
// // // //     await action.save();
// // // //     res.status(201).json(action);
// // // //   } catch (error) {
// // // //     res.status(400).json({ message: 'Error creating action' });
// // // //   }
// // // // };


// // // // Update Action
// // // export const updateAction = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const action = await Action.findByIdAndUpdate(id, req.body, { new: true });
// // //     if (!action) {
// // //       return res.status(404).json({ message: 'Action not found' });
// // //     }
// // //     res.json(action);
// // //   } catch (error) {
// // //     res.status(400).json({ message: 'Error updating action' });
// // //   }
// // // };
// // // // export const updateAction = async (req, res) => {
// // // //   try {
// // // //     const { id } = req.params;
// // // //     const action = await Action.findByIdAndUpdate(id, req.body, { new: true });
// // // //     if (!action) {
// // // //       return res.status(404).json({ message: 'Action not found' });
// // // //     }
// // // //     res.json(action);
// // // //   } catch (error) {
// // // //     res.status(400).json({ message: 'Error updating action' });
// // // //   }
// // // // };

// // // export const deleteAction = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const action = await Action.findByIdAndDelete(id);
// // //     if (!action) {
// // //       return res.status(404).json({ message: 'Action not found' });
// // //     }
// // //     res.json({ message: 'Action deleted successfully' });
// // //   } catch (error) {
// // //     res.status(500).json({ message: 'Error deleting action' });
// // //   }
// // // };
