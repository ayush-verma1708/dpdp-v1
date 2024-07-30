import { Coverage } from '../models/coverage.model.js';
import { Scoped } from '../models/scoped.model.js';
import { ApiError } from '../utils/ApiError.js';
import { AsyncHandler } from '../utils/asyncHandler.js';

const getCoverages = AsyncHandler(async (_, res) => {
  try {
    const coverages = await Coverage.find().populate('scoped');
    res.status(200).send(coverages);
  } catch (error) {
    res.status(500).send(error);
  }
});

const getCoveragesInScope = AsyncHandler( async (req, res)=>{
  try {
      const { scopedId } = req.params;
      const coverages = await Coverage.find({ scoped: { $in: scopedId} }).populate('scoped');
      
      if (!coverages || coverages.length === 0) {
          res.status(404).json({ message: 'No coverages found for this asset ID' });
      }
      res.status(200).json(coverages);
  } catch (error) {
      console.log(error);
      new ApiError(500, "error while getting coverage")
  }
})

// @desc    Get coverage by ID
// @route   GET /api/coverages/:id
// @access  Public
const getCoverageById = AsyncHandler(async (req, res) => {
  try {
    const coverage = await Coverage.findById(req.params.id);
    if (!coverage) return res.status(404).send();
    res.status(200).send(coverage);
  } catch (error) {
    new ApiError(500, error.message)
  }
});

// @desc    Create a new coverage
// @route   POST /api/coverages
// @access  Public
const createCoverage = AsyncHandler(async (req, res) => {
  
  const { name, desc, scopedId } = req.body;
  console.log(req.body);
  if([name, desc, scopedId].some((fields) => fields?.trim() === "")){
      throw new ApiError(400, "All fields are required.")
  }
  try {
      const scopedDetail = await Scoped.findById(scopedId);
      if (!scopedDetail) {
          return res.status(404).json({ error: 'Scoped not found' });
        }
        const coverage = new Coverage({name,desc, scoped: scopedDetail._id})
        await coverage.save();
        res.status(201).json(coverage);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  })

// @desc    Update a coverage
// @route   PUT /api/coverages/:id
// @access  Public
const updateCoverage = AsyncHandler( async (req, res) =>{

  const { name, desc, scoped } = req.body;
  if([name, desc, scoped].some((fields) => fields?.trim() === "")){
      throw new ApiError(400, "All fields are required.")
  }
  try {
      const scopedDetail = await Scoped.findById(scoped);
      if (!scopedDetail) {
          return res.status(404).json({ error: 'Asset not found' });
        }
        const coverage = new Coverage({name,desc, scoped: scopedDetail._id})
        await coverage.save();
        res.status(201).json(scoped);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  })

// @desc    Delete a coverage
// @route   DELETE /api/coverages/:id
// @access  Public
const deleteCoverage = AsyncHandler(async (req, res) => {
  try {
    const coverage = await Coverage.findById(req.params.id);
    if (!coverage){
      return new ApiError(404, "coverage not found")
    }
    await coverage.remove();
    res.json({message: "Coverage Created"})
  } catch (error) {
    res.status(500).send(error);
  }
});

export { createCoverage, getCoverages, getCoverageById, updateCoverage, deleteCoverage, getCoveragesInScope };
