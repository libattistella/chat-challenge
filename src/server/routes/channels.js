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
    console.log(doc);
    res.send(doc);
  });
});

router.get('/:channel', function(req, res, next) {
  console.log('PARAMS', params);
  channelModel.findById(req.params).populate('connectedUsers', 'chats').exec(function(err, doc) {
    if(err) {
      console.log(err);
      res.send(err);
      return;
    }
    console.log(doc);
    res.send(doc);
  });
});

router.post('/connect', function(req, res, next) {

  console.log('Connect user to channel:');
  console.log('Channel:', req.body);
  console.log('User:', req.payload);
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
      console.log(doc);
      res.send(doc);
    });
  });
});

router.post('/disconnect', function(req, res, next) {

  console.log('Disconnect user of channel:');
  console.log('Channel:', req.body);
  console.log('User:', req.payload);
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
      console.log(doc);
      res.send(doc);
    });
  });
});

module.exports = router;