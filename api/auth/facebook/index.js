var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth/fb/facebook/facebookFailure'}), function (req, res){
});

router.get('/facebook/facebookFailure', function (req, res){
});

module.exports = router;

// , function (req, res) {
// 	res.status(200).send({msg: 'Yoloswag360360quickscopedropshotheadshot'});
  // res.sendFile(__dirname + '../../../test.html', function(err){
  //   if(err) {
  //     res.status(err.status).end();
  //   }
  //   var token = jwt.sign({foo:'foobar'}, $config.JWT_SECRET, {expiresInMinutes: 60*5});
  //   res.status(200).json({token: token}).end();
  // });