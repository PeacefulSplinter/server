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
	console.log(req.body.username);
	console.log(req.body.password);
	res.cookie('u_id', user.Id); // Bread and butter, can modify anything else but make sure 2nd argument is the user's ID# from a database query.
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
             }
         });
     });
   });
 };
});
}

exports.signInUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

 User.find({ username: username }, function (err, user) {
   if (!user) {
     console.log('No user by this name');
     res.redirect('/signup');
   }
   if (user) {
       bcrypt.hash(password, user[0].salt, function (err, result) {
        console.log(password);
        if (err) {
          console.log('error: ' + err);
          return;
        };
        bcrypt.compare(result, user[0].password, function (err, res){
          console.log('Hashed value from client: ' + result);
          console.log('Password stored by matched user: ' + user[0].password);

          if (result) {
            console.log("password correct!!!");
          } else {
            console.log('password incorrect');
          }

   });
 });
};
   
 });
}



//   var username = req.body.username;
//   var password = req.body.password;
//   User.find({ username: username }, function (err, user) {
//     console.log('made it');
//     console.log(user);
//     if (err) {
//       console.log('user name doesnt exist'); // <-- This
//       return;
//     }
//     bcrypt.compare(password, user.password, function (err, result) {
//       if (result) {
//         console.log('yo');
//         res.redirect('/'); //Successful login, redirect to user home page
//       } else {
//         console.log('Password wrong!');
//         res.redirect('/'); // password incorrect, try again
//       }
//     });
//   });
// };