import multer from 'multer';
import xlsx from 'xlsx';
import ControlFamily from '../models/controlFamily.js';
import Control from '../models/control.js';
import Action from '../models/action.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const handleUpload = upload.single('file');

const parseExcel = async (buffer) => {
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);

  const controlFamilies = [];
  const controls = [];
  const actions = [];

  data.forEach(row => {
    if (row.control_Family_Id) {
      controlFamilies.push({
        control_Family_Id: row.control_Family_Id,
        name: row.name,
        description: row.description
      });
    } else if (row.control_Id) {
      controls.push({
        control_Id: row.control_Id,
        name: row.name,
        description: row.description,
        control_Family_Id: row.control_Family_Id
      });
    } else if (row.action_Id) {
      actions.push({
        action_Id: row.action_Id,
        name: row.name,
        description: row.description,
        control_Id: row.control_Id
      });
    }
  });

  await ControlFamily.insertMany(controlFamilies);
  await Control.insertMany(controls);
  await Action.insertMany(actions);
};

export const uploadExcel = (req, res) => {
  handleUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file' });
    }
    try {
      await parseExcel(req.file.buffer);
      res.status(200).json({ message: 'Data uploaded successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error parsing file' });
    }
  });
};
