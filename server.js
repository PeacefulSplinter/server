var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

// var path = require('path');
// var Promise = require('bluebird');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
var mongoose = require('mongoose');

var db = mongoose.connection;

var User = require('./db/User/userModel.js');

var port = process.env.PORT || 3000;
var host = process.env.host || '127.0.0.1';
mongoose.connect('mongodb://' + host + '/peacefulSplinter');

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({secret: 'shhhh', saveUninitialized: true, resave: true}));

app.listen(port, function(){
  console.log("Listening on " + port);
});

app.use(passport.initialize());


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
              return done(null, user)
            } else {
              return done(null, false, {message: "invalid password"});
            }
        });
    });
}));

app.get('/', function(req, res){
  console.log('hello');
  res.sendFile(__dirname + '/test.html');
});































// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/test.html'); // home page
// });

// app.post('/', function (req, res) {
//  // creates new user instance
//  var username = req.body.username;
//  var password = req.body.password;

//  var userQuery = User.where({username: username});
//  userQuery.findOne(function(err, user){
// 	console.log(user);
// 	if (err) throw err;
// 	if (user) {
// 		 console.log('user exists!');
//     else {
// 		  new User({
// 		  	username: username,
// 		  	password: password
// 		  }).save();
//       	}
//        }
// 	  }
//     if (!user) {
//      bcrypt.genSalt(10, function (error, result) {
//        bcrypt.hash(password, result, null, function (err, hash) {
//          User.save({
//              username: username,
//              salt: result,
//              password: hash
//            })
//            .complete(function (err, user) {
//              if (!!err) {
//                console.log('An error occurred while creating the table: user.create', err);
//              } else {
//                console.log('made it to DB!');
//                res.redirect('/');
//              }
//            });
//        });
//      });
//    }
//  });

// });

