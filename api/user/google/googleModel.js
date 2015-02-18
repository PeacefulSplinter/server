var mongoose = require('mongoose');

var GoogleSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  accessToken: {
    type: String
  }
});

module.exports = mongoose.model('Google', GoogleSchema);
