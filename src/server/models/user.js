var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  nickname: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  connected_at: { type: mongoose.Schema.Types.ObjectId, ref: 'channel' }
}, { collection: 'user' });

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    nickname: this.nickname,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.SECRET_KEY);
};

UserSchema.methods.validPassword = function(password) {
  return this.password === password;
};

module.exports = mongoose.model('User', UserSchema);