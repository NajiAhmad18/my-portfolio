const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  shortDesc: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  problem: {
    type: String,
  },
  solution: {
    type: String,
  },
  techStack: {
    type: [String],
    default: []
  },
  demoLink: {
    type: String,
    default: '#'
  },
  githubLink: {
    type: String,
    default: '#'
  },
  color: {
    type: String,
    default: '#3b82f6'
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
