var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var User = require('./userModel.js');
var bcrypt = require('bcrypt');

exports.setCookie = function(req, res) {
  res.cookie('u_id', user._id);
  res.send(200);
};

exports.destroyCookie = function(req, res) {
  res.clearCookie('u_id');
  res.send(200);
};

exports.signUpUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username: username
  }, function(err, user) {
    if (user) {
      res.send('Username already exists');
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, result) {
          if (err) {
            res.send('error salting password: ' + err);
          };
          var user_data = {
            username: username,
            password: result,
            salt: salt
          };
          var newName = new User(user_data);
          newName.save(function(error, data) {
            if (error) {
              res.send('error saving to the database: ' + error);
            } else {
              res.cookie('u_id', user[0]._id);
              res.send(200);
            }
          });

        });
      });
    };
  });
}

exports.signInUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.find({
    username: username
  }, function(err, user) {
    if (!user) {
      res.send('No user by this name');
    } else if (user) {
      bcrypt.hash(password, user[0].salt, function(err, hashedPassword) {
        if (err) {
          res.send('hashing error: ' + err);
        };
        bcrypt.compare(hashedPassword, user[0].password, function(err, result) {
          if (hashedPassword === user[0].password) {
            res.cookie('u_id', user[0]._id);
            res.redirect('/home');
            res.send(200);
          } else {
            res.redirect('/');
            res.send(200);
          }
        });
      });
    };
  });
}
