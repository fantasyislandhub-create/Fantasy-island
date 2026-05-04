const Suite = require('../models/Suite');
const { isValidId } = require('../utils/validators');

exports.getSuites = async (req, res, next) => {
  try {
    const suites = await Suite.find().lean();
    res.status(200).json({ success: true, data: suites });
  } catch (error) {
    next(error);
  }
};

exports.createSuite = async (req, res, next) => {
  try {
    const suiteData = { ...req.body };
    
    if (req.files) {
      if (req.files.img) suiteData.img = req.files.img[0].path;
      if (req.files.gallery) suiteData.gallery = req.files.gallery.map(f => f.path);
    }
    
    if (typeof suiteData.features === 'string') {
      suiteData.features = JSON.parse(suiteData.features);
    }

    const suite = await Suite.create(suiteData);
    res.status(201).json({ success: true, data: suite });
  } catch (error) {
    next(error);
  }
};

exports.updateSuite = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid suite ID format' });
    }

    const suiteData = { ...req.body };
    
    if (req.files) {
      if (req.files.img) suiteData.img = req.files.img[0].path;
      if (req.files.gallery) suiteData.gallery = req.files.gallery.map(f => f.path);
    }

    if (typeof suiteData.features === 'string') {
      suiteData.features = JSON.parse(suiteData.features);
    }

    const suite = await Suite.findByIdAndUpdate(req.params.id, suiteData, { 
      new: true, 
      runValidators: true 
    });
    
    if (!suite) return res.status(404).json({ success: false, message: 'Suite not found' });
    res.status(200).json({ success: true, data: suite });
  } catch (error) {
    next(error);
  }
};

exports.deleteSuite = async (req, res, next) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid suite ID format' });
    }
    const suite = await Suite.findByIdAndDelete(req.params.id);
    if (!suite) return res.status(404).json({ success: false, message: 'Suite not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
