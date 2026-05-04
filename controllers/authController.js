const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fantasy-island-secret-key-2026', {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // 1) Check if username and password exist
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    // 2) Check if admin exists & password is correct
    const admin = await Admin.findOne({ username }).select('+password');

    if (!admin || !(await admin.comparePassword(password, admin.password))) {
      return res.status(401).json({ success: false, message: 'Incorrect username or password' });
    }

    // 3) If everything ok, send token to client
    const token = signToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      data: {
        username: admin.username
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        username: req.admin.username
      }
    });
  } catch (error) {
    next(error);
  }
};
