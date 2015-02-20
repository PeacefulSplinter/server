var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/facebook', passport.authenticate('facebook'), function (req, res){
});

router.get('/facebook/callback', function(req, res, next){
	passport.authenticate('facebook', function(err, user, info){
		if(err) {return next(err)}
		console.log('test!');
		res.send('we in this!');
	})(req, res, next);
});

module.exports = router;
