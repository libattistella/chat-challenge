var express = require('express');
var router = express.Router();

var userModel = require('../models/user');
var channelModel = require('../models/channel');

/**
 * Get users
 */
router.get('/', function(req, res, next) {
  userModel.find({}, function(err, doc) {
    if(err) {
      console.log(err);
      res.send(err);
      return;
    }
    console.log(doc);
    res.json(doc);
  });
});

router.get('/disconnect', function(req, res, next) {

  userModel.findByIdAndUpdate(req.payload._id, { $set: { connected_at: null }}, { new: true }, function(err, doc) {
    if(err) { 
      console.log(err);
      res.send(err);
      return;
    }
    channelModel.update({}, {$pull: { connectedUsers: req.payload._id }}, { multi: true })
      .exec(function(err, doc) {
        if(err) { 
          console.log(err);
          res.send(err);
          return;
        }
        console.log("Borró de todos");
        res.send(doc);
      });
  });
});

module.exports = router;
