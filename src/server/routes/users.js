var express = require('express');
var router = express.Router();

/**
 * Get users
 */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/users/:channel', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
