var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');

router.post('/register', function(req, res, next) {
  console.log("Register");
  var user = new User();

  user.nickname = req.body.nickname;
  user.password = req.body.password;

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
});

// module.exports.register = function(req, res) {
//   var user = new User();

//   user.nickname = req.body.nickname;
//   user.password = req.body.password;

//   user.save(function(err) {
//     var token;
//     token = user.generateJwt();
//     res.status(200);
//     res.json({
//       "token" : token
//     });
//   });
// };

router.post('/login', function(req, res, next) {
  console.log("Login");
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});

// module.exports.login = function(req, res) {
//   passport.authenticate('local', function(err, user, info){
//     var token;

//     // If Passport throws/catches an error
//     if (err) {
//       res.status(404).json(err);
//       return;
//     }

//     // If a user is found
//     if(user){
//       token = user.generateJwt();
//       res.status(200);
//       res.json({
//         "token" : token
//       });
//     } else {
//       // If user is not found
//       res.status(401).json(info);
//     }
//   })(req, res);
// };

module.exports = router;