import express from 'express';
import { getControls, createControl } from '../controllers/controlController.js';

const router = express.Router();

router.get('/', getControls);
router.post('/', createControl);

export default router;
