var express = require('express');
var router = express.Router();
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var jwt = require('jsonwebtoken');
var expressToken = require('express-jwt');
var session = require('express-session');

var router = express.Router();

router.use(session({ secret: 'SECRET' }));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new TwitterStrategy({
    consumerKey: $config.facebook.TWITTER_ID,
    consumerSecret: $config.facebook.TWITTER_SECRET,
    callbackURL: "http://localhost:3000/api/tw/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	done(null, profile);
  }
));

router.get('/twitter', passport.authenticate('twitter'), function (req, res) {
});

router.get('/twitter/callback', passport.authenticate('twitter'), function (req, res) {
  console.log('User information name: '+ req.user.displayName);
  var token = jwt.sign({foo:'foobar'}, $config.JWT_SECRET, {expiresInMinutes: 60*5});
  res.status(200).json({token: token});
});

module.exports = router;
