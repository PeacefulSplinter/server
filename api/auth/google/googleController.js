var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User){
  passport.use(new GoogleStrategy({
      clientID: $config.google.clientID,
      clientSecret: $config.google.clientSecret,
      callbackURL: 'http://spectreswag.herokuapp.com/auth/g/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({providers.googleID: profile.id}, function(err, user){
        if (err) return done(err);
        if (!user) {
          var newUser = new User({username: profile.id});
          newUser.save(function(err, user){
            if (err) { return done(err); }
            var newGrantEntry = new Grant({creator: user._id, googleToken: accessToken});
            newGrantEntry.save(function(err, user){
              if(err) { return done(err); }
            });
          });
        }
        if (user){
          var newGrantEntry = new Grant({googleToken: accessToken});
          newGrantEntry.save(function(err, user){
            if(err) { return done(err); }
          });
        }
      });
      done(null, profile);
    }
  ));
}