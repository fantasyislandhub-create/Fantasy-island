const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const dotenv = require('dotenv');

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fantasy_island');
    console.log('Connected to DB');

    await Admin.deleteMany({ username: 'admin' });
    
    const admin = new Admin({
      username: 'admin',
      password: 'fantasy2026'
    });

    await admin.save();
    console.log('Admin reset successfully: admin / fantasy2026');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetAdmin();
