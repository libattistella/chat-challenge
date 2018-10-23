var mongoose = require('mongoose');

var ChatSchema = new mongoose.Schema({
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'channel' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  message: { type: String },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);