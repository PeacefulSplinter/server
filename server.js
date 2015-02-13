var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var util = require('./lib/utility.js');
var bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var User = require('./db/User/userModel.js');
var UserCtrl = require('./db/User/userController');

var port = process.env.PORT || 3000;
var host = process.env.host || '127.0.0.1';

mongoose.connect('mongodb://' + host + '/peacefulSplinter');
var db = mongoose.connection;

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({secret: 'shhhh', saveUninitialized: true, resave: true}));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/test.html');
});

app.get('/home', function(req, res){
  res.sendFile(__dirname + '/home.html');
});

app.post('/login', UserCtrl.signInUser);
app.post('/signup', UserCtrl.signUpUser);
app.post('/logout', UserCtrl.destroyCookie);
app.listen(port, function(){
  console.log("Listening on " + port);
});
