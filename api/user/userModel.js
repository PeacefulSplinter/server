var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },

  password: {
    type: String
  },

  providers: {
    facebookID: String,
    googleID: String
  },
  grants: {
      type: Object, 
      ref: 'Grant'
  }
});

//bcrypt middleware
UserSchema.pre('save', function(next) {
  var user = this;
  if(!this.password){
    return next();
  }
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
