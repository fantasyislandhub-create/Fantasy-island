const mongoose = require('mongoose');

const suiteSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Suite title is required'],
    trim: true,
    unique: true
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  img: { 
    type: String, 
    required: [true, 'Main image is required']
  },
  gallery: [{ type: String }],
  icon: { 
    type: String, 
    required: true,
    enum: {
      values: ['Shield', 'Star', 'Flame'],
      message: '{VALUE} is not a valid icon type'
    }
  },
  features: [{ 
    type: String,
    trim: true
  }],
  available: { type: Boolean, default: true },
  maxDays: { 
    type: Number, 
    default: 7,
    min: [1, 'Maximum days must be at least 1']
  }
}, { timestamps: true });

// Index for availability-based queries
suiteSchema.index({ available: 1 });

module.exports = mongoose.model('Suite', suiteSchema);
