var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var jwt = require('jsonwebtoken');
var expressToken = require('express-jwt');
var Google = require('./googleModel');
var session = require('express-session');
var Grant = require('./../../grant/grantModel');
var router = express.Router();

router.use(session({ secret: 'SECRET' }));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Google.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: $config.google.clientID,
    clientSecret: $config.google.clientSecret,
    callbackURL: 'http://spectreswag.herokuapp.com/api/g/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    var user = Google.where({username: profile.id});
    user.findOne(function(err, user){
      if (err) return done(err);
      if (!user) {
        var newUser = new Google({username: profile.id, accessToken: accessToken});
        newUser.save(function(err, user){
          if (err) { return done(err); }
          var newGrantEntry = new Grant({creator: user._id, username: profile.id});
          newGrantEntry.save(function(err, user){
            if(err) { return done(err); }
          });
        });
      }
      if (user){
        var grantFinder = Grant.where({username: profile.id});
        grantFinder.findOne(function(err, user){
          if(err) return done(err);
        })
        var grantEntry = new Grant({facebookToken: accessToken});
        grantEntry.save(function(err, user){
          if(err) { return done(err); }
        });
      }
    });
    done(null, profile);
  }
));

router.get('/google', passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}), function (req, res) {
});

router.get('/google/callback', passport.authenticate('google'), function (req, res) {
  var token = jwt.sign({foo:'foobar'}, '$config.JWT_SECRET', {expiresInMinutes: 60*5});
  res.status(200).json({token: token});
});

module.exports = router;
