var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  nickname: { type: String, unique: true, required: true },
  connected_at: { type: mongoose.Schema.Types.ObjectId, ref: 'channel' }
});

module.exports = mongoose.model('User', UserSchema);