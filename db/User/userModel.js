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
	}

});

// before saving our user to DB
UserSchema.pre('save', function(next){
	// this - object that contains username and password
	var user = this;
	if (!user.isModified("password")) {
		return next();
	}
	bcrypt.genSalt(10, function(err, salt){
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function(err, hash){
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		})
	})
})

UserSchema.methods.comparePassword = function(loginPassword, cb) {
	bcrypt.compare(loginPassword, this.password, function(err, isMatch){
		if (err) return cb(err);
		cb(null, isMatch);
	});
}

// UserSchema.methods.generateHash = function(password) {
// 	return bcrypt.hash(password, function(err, hash){
// 		if (err) throw err;
// 	});
// }



var User = mongoose.model('User', UserSchema);

module.exports = User;