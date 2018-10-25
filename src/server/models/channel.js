var mongoose = require('mongoose');
var Chat = require('./chat');
var User = require('./user');

var ChannelSchema = new mongoose.Schema({
  name: { type: String },
  connectedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chat' }]
}, { collection: 'channel' });

// var ChannelSchema = new mongoose.Schema({
//   name: { type: String },
//   connectedUsers: [User],
//   chats: [Chat]
// }, { collection: 'channel' });

module.exports = mongoose.model('channel', ChannelSchema);