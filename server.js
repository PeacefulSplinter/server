var express = require('express'); 
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./db/User/userModel.js');
var UserCtrl = require('./db/User/userController');
var options = {origin: true};

var port = process.env.PORT || 3000;
var host = MONGOLAB_URI || 'mongodb://127.0.0.1/peacefulSplinter';

mongoose.connect(host);

app.use(cors(options));
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