var express = require('express');
var router = express.Router();

var channelModel = require('../models/channel');

/**
 * Get Channels
 */
router.get('/', function(req, res, next) {
  console.log("Llega al get");
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
  res.send('respond with a resource');
});

module.exports = router;