const mongoose = require('mongoose');
require('dotenv').config();
const Settings = require('./models/Settings');

async function check() {
  await mongoose.connect(process.env.MONGODB_URI);
  const settings = await Settings.findOne();
  console.log('Final DB Verification:', JSON.stringify(settings, null, 2));
  process.exit(0);
}

check();
