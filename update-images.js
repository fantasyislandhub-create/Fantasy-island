const mongoose = require('mongoose');
const Suite = require('./models/Suite');
const dotenv = require('dotenv');

dotenv.config();

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fantasy_island');
    console.log('Connected to DB');

    const updates = [
      {
        title: "The Velvet Lounge",
        img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        title: "Crimson VIP Suite",
        img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1200"
        ]
      },
      {
        title: "Royal Obsidian",
        img: "https://images.unsplash.com/photo-1591088398332-8a77d399ef84?auto=format&fit=crop&q=80&w=1200",
        gallery: [
          "https://images.unsplash.com/photo-1591088398332-8a77d399ef84?auto=format&fit=crop&q=80&w=1200",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1200"
        ]
      }
    ];

    for (const update of updates) {
      await Suite.findOneAndUpdate({ title: update.title }, { 
        img: update.img, 
        gallery: update.gallery 
      });
      console.log(`Updated images for ${update.title}`);
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateImages();
