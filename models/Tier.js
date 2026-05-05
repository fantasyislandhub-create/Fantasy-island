const mongoose = require('mongoose');

const tierSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  period: {
    type: String,
    default: '/ Reservation'
  },
  features: [{
    type: String
  }],
  badge: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Tier', tierSchema);
