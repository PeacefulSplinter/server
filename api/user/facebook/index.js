var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var jwt = require('jsonwebtoken');
var expressToken = require('express-jwt');
var Facebook = require('./facebookModel');
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
  Facebook.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: $config.facebook.clientID,
    clientSecret: $config.facebook.clientSecret,
    callbackURL: $config.facebook.callbackUrl
  },
  function(accessToken, refreshToken, profile, done) {
    var user = Facebook.where({username: profile.id});
    user.findOne(function(err, user){
      if (err) return done(err);
      if (!user) {
        var newUser = new Facebook({username: profile.id});
        newUser.save(function(err, user){
          if (err) { return done(err); }
        });
      };
  	  done(null, profile);
    })
  }
));

router.get('/facebook', passport.authenticate('facebook'), function (req, res) {

});

router.get('/facebook/callback', passport.authenticate('facebook'), function (req, res) {
  var token = jwt.sign({foo:'foobar'}, '$config.JWT_SECRET', {expiresInMinutes: 60*5});
  res.status(200).json({token: token});
});

module.exports = router;
