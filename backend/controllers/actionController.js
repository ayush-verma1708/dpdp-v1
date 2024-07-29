import Action from '../models/action.js';

export const getActions = async (req, res) => {
  try {
    const actions = await Action.find();
    res.json(actions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching actions' });
  }
};

export const createAction = async (req, res) => {
  try {
    const action = new Action(req.body);
    await action.save();
    res.status(201).json(action);
  } catch (error) {
    res.status(400).json({ message: 'Error creating action' });
  }
};
