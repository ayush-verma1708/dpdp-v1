import express from 'express';
import { uploadExcel } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', uploadExcel);

export default router;
