var mongoose = require('mongoose');

var grantSchema = new mongoose.Schema({

	creator: {
		type: String,
		unique: true,
		required: true
	},

	username: {
		type: String,
		unique: true,
		required: true
	},

	twitterToken: {
		type: String,
	},

	instagramToken: {
		type: String,
	},

	mailchimpToken: {
		type: String,
	},

	twitchToken: {
		type: String,
	},

	googleToken: {
		type: String
	}

});

module.exports = mongoose.model('Grant', grantSchema);



