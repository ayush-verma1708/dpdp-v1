import { Router } from 'express';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { createAsset, getAssets, getAssetById, updateAsset, deleteAsset, } from '../controllers/asset.controller.js';
=======
import { createAsset, getAssets, getAssetById, updateAsset, deleteAsset, getScopedByAsset } from '../controllers/asset.controller.js';
>>>>>>> Stashed changes
=======
import { createAsset, getAssets, getAssetById, updateAsset, deleteAsset, getScopedByAsset } from '../controllers/asset.controller.js';
>>>>>>> Stashed changes
=======
import { createAsset, getAssets, getAssetById, updateAsset, deleteAsset, getScopedByAsset } from '../controllers/asset.controller.js';
>>>>>>> Stashed changes
=======
import { createAsset, getAssets, getAssetById, updateAsset, deleteAsset, getScopedByAsset } from '../controllers/asset.controller.js';
>>>>>>> Stashed changes

const assetRouter = Router();

assetRouter.route("/add-asset").post(createAsset);
assetRouter.route("/").get(getAssets);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
assetRouter.route("/:assetId/scoped").get(getScopedByAsset);
>>>>>>> Stashed changes
=======
assetRouter.route("/:assetId/scoped").get(getScopedByAsset);
>>>>>>> Stashed changes
=======
assetRouter.route("/:assetId/scoped").get(getScopedByAsset);
>>>>>>> Stashed changes
=======
assetRouter.route("/:assetId/scoped").get(getScopedByAsset);
>>>>>>> Stashed changes
assetRouter.route("/asset-details/:id").get(getAssetById);
assetRouter.route("/asset-update/:id").put(updateAsset);
assetRouter.route("/asset-delete/:id").delete(deleteAsset);

export default assetRouter;
