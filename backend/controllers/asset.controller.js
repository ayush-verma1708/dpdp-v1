<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { Asset } from '../models/asset.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { AsyncHandler } from '../utils/asyncHandler.js';
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import { Asset } from "../models/asset.model.js";
import { Scoped } from "../models/scoped.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

const getAssets = AsyncHandler(async (req, res) => {
  try {
    const assets = await Asset.find({});
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    res.json(assets)
  }
  catch (err) {
=======
    res.json(assets);
  } catch (err) {
>>>>>>> Stashed changes
=======
    res.json(assets);
  } catch (err) {
>>>>>>> Stashed changes
=======
    res.json(assets);
  } catch (err) {
>>>>>>> Stashed changes
    res.status(500).json({ message: err.message });
  }
});

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// @desc    Get asset by ID
// @route   GET /api/assets/:id
// @access  Public
const getAssetById = AsyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id).populate('coverages');
=======
const getAssetById = AsyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id).populate("coverages");
>>>>>>> Stashed changes
=======
const getAssetById = AsyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id).populate("coverages");
>>>>>>> Stashed changes
=======
const getAssetById = AsyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id).populate("coverages");
>>>>>>> Stashed changes
  if (asset) {
    res.json(asset);
  } else {
    res.status(404);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    throw new Error('Asset not found');
  }
});

// @desc    Create a new asset
// @route   POST /api/assets
// @access  Public
const createAsset = AsyncHandler(async (req, res) => {
  const { name, desc, type, isScoped } = req.body;
  try {
  const asset = new Asset({ name, desc, type, isScoped });

    const createdAsset = await asset.save();
    
  res.status(201).json(
    new ApiResponse(201, createdAsset, "Crated Asset Successfully")
  );
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    throw new Error("Asset not found");
  }
});

const createAsset = AsyncHandler(async (req, res) => {
  const {
    name, type, desc, isScoped, criticality,
    businessOwnerName, businessOwnerEmail, itOwnerName, itOwnerEmail
  } = req.body;

  try {
    const newAsset = new Asset({
      name,
      type,
      desc,
      isScoped,
      criticality,
      businessOwnerName,
      businessOwnerEmail,
      itOwnerName,
      itOwnerEmail
    });

    const createdAsset = await newAsset.save();

    res
      .status(201)
      .json(new ApiResponse(201, createdAsset, "Created Asset Successfully"));
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// @desc    Update an asset
// @route   PUT /api/assets/:id
// @access  Public
const updateAsset = AsyncHandler(async (req, res) => {
  
  try {
    const { name, desc } = req.body;
    const asset = await Asset.findById(req.params.id);
  
    if (asset) {
      asset.name = name;
      asset.desc = desc;
  
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
const updateAsset = AsyncHandler(async (req, res) => {
  try {
    const { name, desc } = req.body;
    const asset = await Asset.findById(req.params.id);

    if (asset) {
      asset.name = name;
      asset.desc = desc;

<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      const updatedAsset = await asset.save();
      res.json(updatedAsset);
    } else {
      res.status(404);
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      throw new Error('Asset not found');
=======
      throw new Error("Asset not found");
>>>>>>> Stashed changes
=======
      throw new Error("Asset not found");
>>>>>>> Stashed changes
=======
      throw new Error("Asset not found");
>>>>>>> Stashed changes
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
// @desc    Delete an asset
// @route   DELETE /api/assets/:id
// @access  Public
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
const deleteAsset = AsyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);

  if (asset) {
    await asset.remove();
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    res.json({ message: 'Asset removed' });
  } else {
    res.status(404);
    throw new Error('Asset not found');
  }
});

export { createAsset, getAssets, getAssetById, updateAsset, deleteAsset };
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    res.json({ message: "Asset removed" });
  } else {
    res.status(404);
    throw new Error("Asset not found");
  }
});

const getScopedByAsset = AsyncHandler(async (req, res) => {
  const { assetId } = req.params;
  const scoped = await Scoped.find({ asset: assetId });
  res.json(scoped);
});

export {
  createAsset,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  getScopedByAsset,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
};
>>>>>>> Stashed changes
=======
};
>>>>>>> Stashed changes
=======
};
>>>>>>> Stashed changes
