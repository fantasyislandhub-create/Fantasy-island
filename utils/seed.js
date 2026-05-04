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
          img: "/src/assets/room-regular.png",
          icon: "Shield",
          features: ["Four curated sessions", "Private obsidian finishes", "Complimentary signature drink", "Soundproof sanctuary"]
        },
        {
          title: "Crimson VIP Suite",
          price: 1000,
          img: "/src/assets/room-vip.png",
          icon: "Star",
          features: ["Eight immersive sessions", "Private bar & mixologist", "Premium open selection", "Priority concierge access"]
        },
        {
          title: "Royal Obsidian",
          price: 1500,
          img: "/src/assets/room-royal.png",
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

const runSeeds = async () => {
  await Promise.all([seedSuites(), seedSettings()]);
};

module.exports = runSeeds;
