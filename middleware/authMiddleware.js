const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'You are not logged in! Please log in to get access.' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fantasy-island-secret-key-2026');

    // Check if admin still exists
    const currentAdmin = await Admin.findById(decoded.id);
    if (!currentAdmin) {
      return res.status(401).json({ success: false, message: 'The user belonging to this token no longer exists.' });
    }

    // Grant access to protected route
    req.admin = currentAdmin;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token. Please log in again.' });
  }
};
