const Tier = require('../models/Tier');

// Get all tiers
exports.getAllTiers = async (req, res) => {
  try {
    const tiers = await Tier.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: tiers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create a tier
exports.createTier = async (req, res) => {
  try {
    const tier = await Tier.create(req.body);
    res.status(201).json({
      success: true,
      data: tier
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a tier
exports.updateTier = async (req, res) => {
  try {
    const tier = await Tier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!tier) {
      return res.status(404).json({
        success: false,
        message: 'Tier not found'
      });
    }
    res.status(200).json({
      success: true,
      data: tier
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a tier
exports.deleteTier = async (req, res) => {
  try {
    const tier = await Tier.findByIdAndDelete(req.params.id);
    if (!tier) {
      return res.status(404).json({
        success: false,
        message: 'Tier not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Tier deleted'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
