var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  grants: [
    // list of all api's granted to user
  ]

  // ,
  // facebook: {
  //   type: String
  // },
  // twitter: {
  //   type: String
  // },
  // mailchimp: {
  //   type: String
  // },
  // twitch: {
  //   type: String
  // }
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

// UserSchema.methods.authenticate = function(plainText) {
//     return this.encryptPassword(plainText) === this.hashedPassword;
// }

// UserSchema.methods.encryptPassword = function(password) {
//     if (!password || !this.salt) return '';
//     var salt = new Buffer(this.salt, 'base64');
//     return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
// }

module.exports = mongoose.model('User', UserSchema);
