import { Router } from 'express'
import { getScoped, addScoped, updateScoped, deleteScoped, getScopedInAsset } from '../controllers/scoped.controller.js'

const scopedRouter = Router();

scopedRouter.route('/').get(getScoped);
scopedRouter.route('/add-scoped').post(addScoped);
<<<<<<< Updated upstream
=======
scopedRouter.route("/:assetId/scoped").get(getScoped);
>>>>>>> Stashed changes
scopedRouter.route('/assets/:assetId').get(getScopedInAsset);
scopedRouter.route('/scoped-update/:id').put(updateScoped);
scopedRouter.route('/scoped-delete/:id').delete(deleteScoped);

export default scopedRouter;