process.env.NODE_ENV = process.env.NODE_ENV || 'development';
global._ = require('lodash');
global.$config = require('./config/main');

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport'),
FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

var whitelistUrls = [];
var optionObj = {
  origin: function(origin, callback){
	    var originIsWhitelisted = whitelistUrls.indexOf(origin) !== -1;
	    callback(null, originIsWhitelisted);
  	}

  };
//};

};
if ($config.env === 'development') {
  whitelistUrls.push('http://localhost:3000');
}

if ($config.env === 'production') {
  whitelistUrls.push($config.productionURL);
}


app.use(cors(optionObj));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

mongoose.connect($config.mongo.url);


// PASSPORT STUFF
passport.use(new FacebookStrategy({

    clientID: 1454682164794827,
    clientSecret: 'e9b54e4ab683bf119514795aec23a2b8',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    passReqToCallback: true
  },

  function(req, token, tokenSecret, profile, done) {
    if (!req.user) {
      // Not logged-in. Authenticate based on Facebook account.
      console.log(req.user);
    } else {
      // Logged in. Associate Facebook account with user. Preserve the login
      // state by supplying the existing user after association.
      return done(null, req.user);
    }
  }
));


require('./routes')(app);

app.listen($config.port, function(){
  console.log("Listening on " + $config.port);
});

exports = module.exports = app;
