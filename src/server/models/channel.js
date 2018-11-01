var mongoose = require('mongoose');

var ChannelSchema = new mongoose.Schema({
  name: { type: String },
  connectedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }]
}, { collection: 'channel' });

module.exports = mongoose.model('channel', ChannelSchema);