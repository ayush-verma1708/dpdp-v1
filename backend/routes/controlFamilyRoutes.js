import express from 'express';
import { getControlFamilies, createControlFamily } from '../controllers/controlFamilyController.js';

const router = express.Router();

router.get('/', getControlFamilies);
router.post('/', createControlFamily);

export default router;
