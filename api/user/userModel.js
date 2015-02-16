
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  facebook: {
    type: String
  },
  twitter: {
    type: String
  },
  mailchimp: {
    type: String
  },
  twitch: {
    type: String
  }
});

//bcrypt middleware
UserSchema.pre('save', function(next) {
  var user = this;
  if(!user.isModified('password')) {
    return next();
  };
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {
      return next(err);
    };
    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);
      user.password = hash;
      next();
    });
  });
});


// Password verification
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) {
      return cb(err);
    };
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);