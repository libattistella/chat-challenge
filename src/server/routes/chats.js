var express = require('express');
var router = express.Router();
var chatModel = require('../models/chat.js');
var channelModel = require('../models/channel');

/**
 * Get the last 10 chats
 */
router.get('/:channel', function(req, res, next) {

  chatModel.find({ channel: req.params.channel })
    .sort({ created_at: -1 })
    .limit(10)
    .populate({ path: 'user', select: '_id nickname' })
    .exec(function(err, doc) {
      if(err) {
        console.log(err);
        res.send(err);
        return;
      }
      res.send(doc);
    });
});

/**
 * Save chat
 */
router.post('/new', function(req, res, next) {

  chatModel.create(req.body, function (err, chat) {
    if (err) {
      console.log(err);
      res.send(err);
    }
    channelModel.findByIdAndUpdate(chat.channel, {$push: { chats: chat._id }}, { new: true }, function(err, channel) {
      if(err) { 
        console.log(err);
        res.send(err);
        return;
      }
      chatModel.findById(chat._id)
        .populate({ path: 'user', select: '_id nickname' })
        .exec(function(err, doc) {
          if(err) {
            console.log(err);
            res.send(err);
            return;
          }
          res.send(doc);
        });
    });
  });
});

module.exports = router;