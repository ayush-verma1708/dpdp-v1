import { Asset } from "../models/asset.model.js";
import { AssetDetails } from "../models/assetDetails.model.js";
import { Scoped } from "../models/scoped.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";

const getAssetDetails = AsyncHandler(async (req, res) => {
  try {
    const assetDetails = await AssetDetails.find({})
      .populate('asset', 'name isScoped') // Populate the asset field with its name and isScoped
      .populate('scoped', 'name') // Populate the scoped field with its name


    if (!Array.isArray(assetDetails)) {
      console.error('Expected array from database query, got:', assetDetails);
      res.status(500).json({ message: 'Unexpected response from database' });
      return;
    }
    const modifiedAssetDetails = assetDetails.map(detail => {
      if (!detail.asset.isScoped) {
        return {
          ...detail.toObject(),
          scoped: { name: 'non-scoped' },
          coverages: 0,
        };
      }
      return detail;
    });

    res.json(modifiedAssetDetails);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: Unable to fetch asset details');
  }
});

const addAssetDetails = AsyncHandler(async (req, res) => {
  const {
    asset,
    scoped,
    criticality,
    businessOwnerName,
    businessOwnerEmail,
    itOwnerName,
    itOwnerEmail,
    coverages,
  } = req.body;
  
  // Fetch the Asset to check if it is scoped
  const assets = await Asset.findById(asset);

  if (!assets) {
    res.status(404);
    throw new Error('Asset not found');
  }

  let finalScopedId = scoped;
  let finalCoverages = coverages;

  if (!assets.isScoped) {
    // If the asset is not scoped, set scoped to 'non-scoped' and coverages to 0
    const nonScoped = await Scoped.findOne({ name: 'non-scoped' });

    if (!nonScoped) {
      // If 'non-scoped' does not exist, create it
      const newNonScoped = new Scoped({ name: 'non-scoped' });
      await newNonScoped.save();
      finalScopedId = newNonScoped._id;
    } else {
      finalScopedId = nonScoped._id;
    }

    finalCoverages = 0;
  }

  const assetDetails = new AssetDetails({
    asset: assets,
    scoped: finalScopedId,
    criticality,
    businessOwnerName,
    businessOwnerEmail,
    itOwnerName,
    itOwnerEmail,
    coverages: finalCoverages,
  });

  const createdAssetDetails = await assetDetails.save();
  res.status(201).json(createdAssetDetails);
});

const updateAssetDetails = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { asset, scoped, criticality, businessOwnerName, businessOwnerEmail, itOwnerName, itOwnerEmail, coverages } = req.body;

  try {
    const assetDetail = await AssetDetails.findById(id);

    if (!assetDetail) {
      res.status(404);
      throw new Error('Asset Detail not found');
    }

    assetDetail.asset = asset || assetDetail.asset;
    assetDetail.scoped = scoped || assetDetail.scoped;
    assetDetail.criticality = criticality || assetDetail.criticality;
    assetDetail.businessOwnerName = businessOwnerName || assetDetail.businessOwnerName;
    assetDetail.businessOwnerEmail = businessOwnerEmail || assetDetail.businessOwnerEmail;
    assetDetail.itOwnerName = itOwnerName || assetDetail.itOwnerName;
    assetDetail.itOwnerEmail = itOwnerEmail || assetDetail.itOwnerEmail;
    assetDetail.coverages = coverages || assetDetail.coverages;

    const updatedAssetDetail = await assetDetail.save();

    res.json(updatedAssetDetail);
  } catch (error) {
    res.status(500);
    throw new Error('Error updating asset details');
  }
});

const deleteAssetDetails = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  
  
  try {
    const assetDetail = await AssetDetails.findByIdAndDelete(id);

    if (!assetDetail) {
      res.status(404);
      throw new Error('Asset Detail not found');
    }


    res.json({ message: 'Asset Detail removed' });
  } catch (error) {
    res.status(500);
    throw new Error('Error deleting asset details');
  }
});

export { getAssetDetails, addAssetDetails, deleteAssetDetails, updateAssetDetails };