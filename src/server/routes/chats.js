var express = require('express');
var router = express.Router();

/* GET chats listing. */
router.get('/chats', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;