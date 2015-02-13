var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var Promise = require('bluebird');
var User = require('./userModel.js');
var bcrypt = require('bcrypt');

exports.setCookie = function (req, res){
	res.cookie('u_id', user._id);
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
     res.redirect('/');
   }
   if (!user) {
     bcrypt.genSalt(10, function (err, salt) {
       console.log('made it thru salt: ' + salt);
       bcrypt.hash(password, salt, function (err, result) {
        if (err) {
          console.log('error: ' + err);
        }; 
        console.log('made it to results: ' + result);
         var user_data = {
             username: username,
             password: result,
             salt: salt
         };
         console.log("\n" + user_data.password);
         var newName = new User(user_data);
         console.log(newName);
         newName.save( function(error, data){
             if(error){
                 console.log('yikes');
                 console.log(error);
             }
             else{
                 console.log('complete!');
                 console.log(data);
                 res.redirect('/');
             }
         });
         
     });
   });
 };
});
}

exports.signInUser = function (request, response) {
  var username = request.body.username;
  var password = request.body.password;

 User.find({ username: username }, function (err, user) {
  console.log(user);
   if (user.length === 0) {
     console.log('No user by this name');
     response.redirect('/');
   }
   else if (user) {
       bcrypt.hash(password, user[0].salt, function (err, hashedPassword) {
        if (err) {
          console.log('error: ' + err);
          return;
        };
        bcrypt.compare(hashedPassword, user[0].password, function (err, res){
          if (hashedPassword === user[0].password) {
            console.log("password correct!!!");
            response.cookie('u_id', user[0]._id);
            response.redirect('/home');
          } else {
            console.log('compare not working');
            response.redirect('/');
            console.log('password incorrect');
          }

      });
 });

};
   
 });
}