const mongoose = require('mongoose');

// Reusable ObjectId validator
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = { isValidId };
