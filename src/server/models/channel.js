var mongoose = require('mongoose');

var ChannelSchema = new mongoose.Schema({
  name: { type: String },
  active: { type: Boolean, default: true },
  connectedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chat' }]
});

module.exports = mongoose.model('Channel', ChannelSchema);