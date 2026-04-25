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
    default: "As a Software Engineering student, I am dedicated to bridging the gap between complex problems and elegant, scalable solutions. My approach is rooted in structured thinking and the pursuit of clean, maintainable code. Whether building high-performance web applications or architecting backend systems, I strive to create impactful user experiences that solve real-world challenges with precision and creativity."
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
