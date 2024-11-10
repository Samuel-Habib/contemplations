// models/IdeaModel.js
const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  idea: { type: String, required: false },
  category: { type: String, required: false },
  isStarred: { type: Boolean, required: false }
});

module.exports = mongoose.model('Idea', ideaSchema);