var mongoose = require('mongoose');

var FacebookSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  accessToken: {
    type: String
  }
});

module.exports = mongoose.model('Facebook', FacebookSchema);
