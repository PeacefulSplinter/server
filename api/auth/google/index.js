var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne(id, function (err, user) {
    done(err, user);
  });
});

router.get('/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}), function (req, res) {
});

router.get('/google/callback', passport.authenticate('google'), function (req, res) {
	res.status(200).json({msg: 'got it'});
});

module.exports = router; 
