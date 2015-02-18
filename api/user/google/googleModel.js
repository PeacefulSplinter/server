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
  // password: {
  //   type: String
  //   //required: true
  // },
  // accessToken: {
  //   type: String,
  //   required: true
  // },
  // grants: [
  //   // list of all api's granted to user
  // ],
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

module.exports = mongoose.model('Google', GoogleSchema);
