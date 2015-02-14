var express = require('express'); 
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./db/User/userModel.js');
var UserCtrl = require('./db/User/userController');

var port = process.env.PORT || 3000;
var host = MONGOLAB_URI || 'mongodb://127.0.0.1/peacefulSplinter';

mongoose.connect(host);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(session({secret: 'shhhh', saveUninitialized: true, resave: true}));

app.post('/login', UserCtrl.signInUser);
app.post('/signup', UserCtrl.signUpUser);
app.post('/logout', UserCtrl.destroyCookie);

app.listen(port, function(){
  console.log("Listening on " + port);
});

module.exports = app;