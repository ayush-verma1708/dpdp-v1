import express from 'express';
import { getActions, createAction, updateAction, deleteAction } from '../controllers/actionController.js';

const router = express.Router();

router.get('/', getActions);
router.post('/', createAction);
router.put('/:id', updateAction);
router.delete('/:id', deleteAction);

export default router;
