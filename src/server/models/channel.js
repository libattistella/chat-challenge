var mongoose = require('mongoose');

var ChannelSchema = new mongoose.Schema({
  name: { type: String },
  connectedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chat' }]
}, { collection: 'channel' });

module.exports = mongoose.model('channel', ChannelSchema);