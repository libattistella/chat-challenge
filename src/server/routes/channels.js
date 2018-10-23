var express = require('express');
var router = express.Router();

var channelModel = require('../models/channel');

/**
 * Get Channels
 */
router.get('/', function(req, res, next) {
  channelModel.find({}, function(err, doc) {
    if(err) {
      res.send(err);
      return;
    }
    res.json(doc);
  });
});

router.get('/:channel', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;