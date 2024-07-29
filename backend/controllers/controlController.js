import Control from '../models/control.js';

export const getControls = async (req, res) => {
  try {
    const controls = await Control.find();
    res.json(controls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching controls' });
  }
};

export const createControl = async (req, res) => {
  try {
    const control = new Control(req.body);
    await control.save();
    res.status(201).json(control);
  } catch (error) {
    res.status(400).json({ message: 'Error creating control' });
  }
};
