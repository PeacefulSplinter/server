var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User){
  passport.use(new GoogleStrategy({
      clientID: $config.google.clientID,
      clientSecret: $config.google.clientSecret,
      callbackURL: 'http://spectreswag.herokuapp.com/auth/g/google/callback'
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
}