const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  resumeUrl: {
    type: String,
    default: '/resume.pdf' // Fallback to local public file
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);
