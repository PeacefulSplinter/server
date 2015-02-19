var mongoose = require('mongoose');

var FacebookSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  grants: {
      type: String, 
      ref: 'Grant'
  }
});

module.exports = mongoose.model('Facebook', FacebookSchema);
