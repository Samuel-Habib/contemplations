const mongoose = require('mongoose');
const schema = mongoose.Schema;
const thoughtSchema = new schema({
  thought: { type: String, required: false },
  date: { type: Date, required: false },
  idea: { type: String, required: false },
  category: { type: String, required: false }
});
const ThoughtModel = mongoose.model('Thought', thoughtSchema);

module.exports = ThoughtModel;