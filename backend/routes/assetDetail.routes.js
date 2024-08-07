import { Router } from 'express';
import { addAssetDetails, deleteAssetDetails, getAssetDetails, getAssetsInAssetDetails, getScopedInSAssetdDetails, updateAssetDetails } from '../controllers/assetDetails.controller.js';

const assetDetailRouter = Router();

assetDetailRouter.route("/").get(getAssetDetails);
assetDetailRouter.route("/add").post(addAssetDetails);
assetDetailRouter.route('/:id').put(updateAssetDetails);
assetDetailRouter.route("/:id").delete(deleteAssetDetails);
assetDetailRouter.route("/assets/").get(getAssetsInAssetDetails);
assetDetailRouter.route("/scoped/:asset").get(getScopedInSAssetdDetails);

export default assetDetailRouter;
