const Settings = require('../models/Settings');

exports.getSettings = async (req, res, next) => {
  try {
    const settings = await Settings.find().lean();
    const config = {};
    settings.forEach(s => { config[s.key] = s.value; });
    res.status(200).json({ success: true, data: config, raw: settings });
  } catch (error) {
    next(error);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const { settings } = req.body;

    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ success: false, message: 'Settings object is required' });
    }

    const updatePromises = Object.keys(settings).map(key =>
      Settings.findOneAndUpdate(
        { key },
        { value: settings[key] },
        { upsert: true, new: true }
      )
    );

    await Promise.all(updatePromises);
    res.status(200).json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    next(error);
  }
};
