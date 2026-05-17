const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  guestName: { 
    type: String, 
    required: [true, 'Guest name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  phone: { 
    type: String, 
    required: [true, 'Phone number is required'],
    trim: true
  },
  suiteTitle: { 
    type: String, 
    required: [true, 'Suite title is required']
  },
  suitePrice: { 
    type: Number, 
    required: [true, 'Suite price is required'],
    min: [0, 'Price cannot be negative']
  },
  checkInDate: { 
    type: Date, 
    required: [true, 'Check-in date is required']
  },
  duration: { 
    type: Number, 
    required: [true, 'Duration is required'],
    min: [3, 'Minimum stay is 3 days'],
    max: [30, 'Maximum stay is 30 nights']
  },
  totalAmount: { 
    type: Number, 
    required: [true, 'Total amount is required'],
    min: [0, 'Total cannot be negative']
  },
  paymentMethod: { 
    type: String, 
    enum: {
      values: ['Bank Transfer', 'PayPal', 'Bitcoin'],
      message: '{VALUE} is not a supported payment method'
    },
    default: 'Bank Transfer'
  },
  paymentStatus: { 
    type: String, 
    enum: {
      values: ['Pending', 'Completed', 'Failed', 'Refunded'],
      message: '{VALUE} is not a valid payment status'
    },
    default: 'Pending'
  },
  bookingStatus: { 
    type: String, 
    enum: {
      values: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      message: '{VALUE} is not a valid booking status'
    },
    default: 'Pending'
  },
  transactionId: { type: String, unique: true, sparse: true }
}, { timestamps: true });

// Indexes for faster admin queries
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ bookingStatus: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
