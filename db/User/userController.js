var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var Promise = require('bluebird');
var User = require('./userModel.js');

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

exports.signUpUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;


  User.findOne({ username: username }, function (err, user) {
    if (user) {
      console.log('Username already exists');
      console.log(user);
      res.redirect('/signin');
    }
    if (!user) {
      bcrypt.genSalt(10, function (error, result) {
        bcrypt.hash(password, result, null, function (err, hash) {
          User.save({
              username: username,
              salt: result,
              password: hash
            }, function (err, user) {
              if (!!err) {
                console.log('An error occurred while creating the user in the database');
              } else {
                console.log('user creation Successful');
                console.log(user._id);
                console.log(user.id);
                res.cookie('u_id', user._id);
                res.redirect('/');
              }
            });
        });
      });
    }
  });
};

exports.signInUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      console.log('user name doesnt exist'); // <-- This
      return;
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        res.cookie('u_id', user.id);
        res.redirect('/'); //Successful login, redirect to user home page
      } else {
        console.log('Password wrong!');
        res.redirect('/signup'); // password incorrect, try again
      }
    });
  });
};