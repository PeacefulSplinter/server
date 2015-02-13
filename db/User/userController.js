var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');

exports.setCookie = function (req, res){
	console.log(req.body.username);
	console.log(req.body.password);
	res.cookie('u_id', 123); // Bread and butter, can modify anything else but make sure 2nd argument is the user's ID# from a database query.
	res.redirect('/');
};

exports.destroyCookie = function (req, res){
	console.log('destroy!');
	res.clearCookie('u_id'); // Bread and butter, can modify anything else, not this.
	res.redirect('/');
};

passport.use(new LocalStrategy(function(username, password, done){
    User.findOne({username: username}, function(err, user){

        if (err) {
          return done(err);
        } 
        // if username not in database
        if (!user) {
          return done(null, false, {message: 'username not found!!!'});
        }
        // compare both passwords
        user.comparePassword(password, function(err, isMatch){
            if (err) return done(err);
            if (isMatch) {
              res.cookie('u_id', user._id);
              return done(null, user);
            } else {
              return done(null, false, {message: "invalid password"});
            }
        });
    });
}));