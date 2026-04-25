const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  siteTitle: {
    type: String,
    default: 'Naji Ahmad'
  },
  siteSubtitle: {
    type: String,
    default: 'Software Engineering Undergraduate'
  },
  aboutText: {
    type: String,
    default: "Software Engineering Undergraduate focused on building practical, scalable solutions."
  },
  resumeUrl: {
    type: String,
    default: '/resume.pdf'
  },
  resumeOriginalName: {
    type: String,
    default: 'Resume.pdf'
  },
  socialLinks: {
    github: { type: String, default: 'https://github.com/NajiAhmad18' },
    linkedin: { type: String, default: 'https://linkedin.com/in/najiahmad' },
    email: { type: String, default: 'naji@example.com' },
    twitter: { type: String, default: '' }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);
