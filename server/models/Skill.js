const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['programming', 'tools', 'technologies']
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#ffffff'
  }
});

module.exports = mongoose.model('Skill', skillSchema);
