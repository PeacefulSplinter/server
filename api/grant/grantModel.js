var mongoose = require('mongoose');

var grantSchema = new mongoose.Schema({

	userId: {
		type: String,
		unique: true,
		required: true
	},

	facebookToken: {
		type: String,
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



