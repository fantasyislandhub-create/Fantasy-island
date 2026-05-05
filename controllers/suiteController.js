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
    
    // Clean up temporary field
    delete suiteData.existingGallery;
    
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
      
      // Merge existing gallery URLs with newly uploaded files
      const existingGallery = suiteData.existingGallery ? JSON.parse(suiteData.existingGallery) : [];
      const newGalleryPaths = req.files.gallery ? req.files.gallery.map(f => f.path) : [];
      suiteData.gallery = [...existingGallery, ...newGalleryPaths];
    } else {
      // No new files uploaded - just keep the existing gallery URLs
      const existingGallery = suiteData.existingGallery ? JSON.parse(suiteData.existingGallery) : [];
      if (existingGallery.length > 0) {
        suiteData.gallery = existingGallery;
      }
    }
    // Clean up the temporary field
    delete suiteData.existingGallery;

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
