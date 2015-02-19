var mongoose = require('mongoose');
var User = require('./userModel.js');
var Integration = require('./integrationModel.js');


var grantSchema = new mongoose.Schema({

	accessToken: String,
	integration: {
		type: Schema.Types.ObjectId,
		ref: 'Integration'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}

});

var Grant = mongoose.model('Grant', grantSchema);




