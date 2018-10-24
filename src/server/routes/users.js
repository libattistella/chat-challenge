var express = require('express');
var router = express.Router();

var userModel = require('../models/user');

/**
 * Get users
 */
router.get('/users', function(req, res, next) {
  userModel.find({}, function(err, doc) {
    if(err) {
      console.log('ERR', err);
      res.send(err);
      return;
    }
    console.log('RES', doc);
    res.json(doc);
  });
});

router.get('/users/:channel', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
