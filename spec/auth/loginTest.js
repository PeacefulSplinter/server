var expect = require('chai').expect;
var mongoose = require('mongoose');
var userSchema = require('./../../db/User/userModel.js');

beforeEach(function(){
	mongoose.connect('mongodb://127.0.0.1/peacefulSplinter');
})

afterEach(function(done){
	mongoose.disconnect();
	return done();
})

describe('User authenticate', function(){

	var newUser = new userSchema({username: 'steven', password: 'pazzwordzz'});

	it('should be a schema', function(){
		expect(userSchema).to.be.a('function');
	})

	it('should recognize correct schema prperties', function(){
		expect(newUser).to.have.property('username');
		expect(newUser).to.have.property('password');
	})

	it('should recognize correct user', function(){
		expect(newUser.username).to.equal('steven');
	})

	it('should recognize incorrect user', function(){
		expect(newUser.username).to.not.equal('steve');
	})

	it('should recognize correct password', function(){
		expect(newUser.username).to.equal('pazzwordzz');
	})

	it('should recognize incorrect password', function(){
		expect(newUser.username).to.not.equal('pazzwordzzzz');
	})
})