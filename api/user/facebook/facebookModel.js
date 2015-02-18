var mongoose = require('mongoose');

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

module.exports = mongoose.model('User', UserSchema);
