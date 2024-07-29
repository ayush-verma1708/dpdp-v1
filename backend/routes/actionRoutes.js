import express from 'express';
import { getActions, createAction } from '../controllers/actionController.js';

const router = express.Router();

router.get('/', getActions);
router.post('/', createAction);

export default router;
