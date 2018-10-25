var express = require('express');
var router = express.Router();

var userModel = require('../models/user');

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

router.get('/:user', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
