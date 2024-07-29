import ControlFamily from '../models/controlFamily.js';

export const getControlFamilies = async (req, res) => {
  try {
    const controlFamilies = await ControlFamily.find();
    res.json(controlFamilies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching control families' });
  }
};

export const createControlFamily = async (req, res) => {
  try {
    const controlFamily = new ControlFamily(req.body);
    await controlFamily.save();
    res.status(201).json(controlFamily);
  } catch (error) {
    res.status(400).json({ message: 'Error creating control family' });
  }
};
