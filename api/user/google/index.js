var express = require('express');
var router = express.Router();
var passport = require('passport');
var GooglePlusStrategy = require('passport-google-plus');
var jwt = require('jsonwebtoken');
var expressToken = require('express-jwt');
var Google = require('./googleModel');
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

passport.use(new GooglePlusStrategy({
    clientID: '1061316600858-73hm30jeuqe986naemp635ci17qsdgup.apps.googleusercontent.com',
    clientSecret: 'fG7xnb2nr_kC-IV4zsNXm--u',
    apiKey: 'AIzaSyCORGPagCLqs9vIQGptbwgRtPwsL1VaGVU'
  },
  function(accessToken, refreshToken, profile, done) {
  	done(null, profile);
  }
));

router.get('/google', passport.authenticate('google'), function (req, res) {
});

router.get('/google/callback', passport.authenticate('google'), function (req, res) {
  console.log('User information name: '+ req.user.displayName);
  var token = jwt.sign({foo:'foobar'}, '$config.JWT_SECRET', {expiresInMinutes: 60*5});
  res.status(200).json({token: token});
});

module.exports = router;
