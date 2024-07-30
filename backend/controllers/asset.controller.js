import { Asset } from '../models/asset.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { AsyncHandler } from '../utils/asyncHandler.js';

const getAssets = AsyncHandler(async (req, res) => {
  try {
    const assets = await Asset.find({});
    res.json(assets)
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Get asset by ID
// @route   GET /api/assets/:id
// @access  Public
const getAssetById = AsyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id).populate('coverages');
  if (asset) {
    res.json(asset);
  } else {
    res.status(404);
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
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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
  
      const updatedAsset = await asset.save();
      res.json(updatedAsset);
    } else {
      res.status(404);
      throw new Error('Asset not found');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @desc    Delete an asset
// @route   DELETE /api/assets/:id
// @access  Public
const deleteAsset = AsyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id);

  if (asset) {
    await asset.remove();
    res.json({ message: 'Asset removed' });
  } else {
    res.status(404);
    throw new Error('Asset not found');
  }
});

export { createAsset, getAssets, getAssetById, updateAsset, deleteAsset };
