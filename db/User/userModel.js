var mongoose = require('mongoose');
// package to encrypt passwords
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
// set up our user schema 

var UserSchema = new Schema({

	username: { 
		type: String, 
		required: true, 
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	}


});

var User = mongoose.model('User', UserSchema);

module.exports = User;