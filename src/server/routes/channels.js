var express = require('express');
var router = express.Router();
var channelModel = require('../models/channel');
var userModel = require('../models/user');

/**
 * Get Channels
 */
router.get('/', function(req, res, next) {

  channelModel.find({}, function(err, doc) {
    if(err) {
      console.log(err);
      res.send(err);
      return;
    }
    res.send(doc);
  });
});

router.get('/:channel', function(req, res, next) {

  channelModel.findById(req.params.channel)
    .populate({ path: 'connectedUsers', select: 'nickname connected_at' })
    // .populate('chats')
    .exec(function(err, doc) {
      if(err) {
        console.log(err);
        res.send(err);
        return;
      }
      res.send(doc);
    });
});

router.post('/connect', function(req, res, next) {

  userModel.findByIdAndUpdate(req.payload._id, { $set: { connected_at: req.body._id }}, { new: true }, function(err, doc) {
    if(err) { 
      console.log(err);
      res.send(err);
      return;
    }
    channelModel.findByIdAndUpdate(req.body._id, {$push: { connectedUsers: req.payload._id }}, { new: true }, function(err, doc) {
      if(err) { 
        console.log(err);
        res.send(err);
        return;
      }
      res.send(doc);
    });
  });
});

router.post('/disconnect', function(req, res, next) {

  userModel.findByIdAndUpdate(req.payload._id, { $set: { connected_at: null }}, { new: true }, function(err, doc) {
    if(err) { 
      console.log(err);
      res.send(err);
      return;
    }
    channelModel.findByIdAndUpdate(req.body._id, {$pull: { connectedUsers: req.payload._id }}, { new: true }, function(err, doc) {
      if(err) { 
        console.log(err);
        res.send(err);
        return;
      }
      res.send(doc);
    });
  });
});

module.exports = router;