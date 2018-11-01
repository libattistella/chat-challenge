var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String },
  created_at: { type: Date, default: Date.now }
}, { collection: 'chat' });

module.exports = mongoose.model('Chat', ChatSchema);