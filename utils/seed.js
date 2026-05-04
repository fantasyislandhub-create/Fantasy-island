const Suite = require('../models/Suite');
const Settings = require('../models/Settings');

const seedSuites = async () => {
  try {
    const count = await Suite.countDocuments();
    if (count === 0) {
      const suites = [
        {
          title: "The Velvet Lounge",
          price: 580,
          img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
          gallery: [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=1200"
          ],
          icon: "Shield",
          features: ["Four curated sessions", "Private obsidian finishes", "Complimentary signature drink", "Soundproof sanctuary"]
        },
        {
          title: "Crimson VIP Suite",
          price: 1000,
          img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200",
          gallery: [
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200"
          ],
          icon: "Star",
          features: ["Eight immersive sessions", "Private bar & mixologist", "Premium open selection", "Priority concierge access"]
        },
        {
          title: "Royal Obsidian",
          price: 1500,
          img: "https://images.unsplash.com/photo-1591088398332-8a77d399ef84?auto=format&fit=crop&q=80&w=1200",
          gallery: [
            "https://images.unsplash.com/photo-1591088398332-8a77d399ef84?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200"
          ],
          icon: "Flame",
          features: ["Unlimited session access", "24/7 Personal concierge", "Full premium complimentary bar", "The peak of luxury"]
        }
      ];
      await Suite.insertMany(suites);
      console.log('[SEED] Suites seeded successfully');
    }
  } catch (error) {
    console.error('[SEED] Error seeding suites:', error.message);
  }
};

const seedSettings = async () => {
  try {
    const count = await Settings.countDocuments();
    if (count === 0) {
      const defaultSettings = [
        { key: 'bank_name', value: 'Fantasy Island Luxury Bank', label: 'Bank Name', category: 'Bank Transfer' },
        { key: 'account_number', value: '1234567890', label: 'Account Number', category: 'Bank Transfer' },
        { key: 'account_name', value: 'FANTASY ISLAND LIMITED', label: 'Account Name', category: 'Bank Transfer' },
        { key: 'bitcoin_address', value: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', label: 'Bitcoin Address', category: 'Crypto' },
        { key: 'paypal_client_id', value: 'sb', label: 'PayPal Client ID', category: 'PayPal' },
      ];
      await Settings.insertMany(defaultSettings);
      console.log('[SEED] Settings seeded successfully');
    }
  } catch (error) {
    console.error('[SEED] Error seeding settings:', error.message);
  }
};

const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    const count = await Admin.countDocuments();
    if (count === 0) {
      const admin = new Admin({
        username: 'admin',
        password: 'fantasy2026' // You should change this after first login
      });
      await admin.save();
      console.log('[SEED] Default admin created: admin / fantasy2026');
    }
  } catch (error) {
    console.error('[SEED] Error seeding admin:', error.message);
  }
};

const runSeeds = async () => {
  await Promise.all([seedSuites(), seedSettings(), seedAdmin()]);
};

module.exports = runSeeds;
