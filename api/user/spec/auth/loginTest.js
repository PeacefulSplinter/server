'use strict';

var expect = require('chai').expect;
var should = require('should');
var mongoose = require('mongoose');
var userSchema = require('./../../userModel.js');
var server = require('./../../../../server.js');
var request = require('supertest');
var userCtrl = require('./../../userController.js');

var user = new userSchema({
	username: 'Arun',
	password: 'password'
});

describe('Tests', function(){
	before(function(done){
		if (mongoose.connection.db) return done();
		mongoose.connect('mongodb://127.0.0.1/peacefulSplinter', done)
	});
});

// beforeEach(function(){
// 	mongoose.connect('mongodb://127.0.0.1/peacefulSplinter');
// });

afterEach(function(done){
	mongoose.disconnect();
	return done();
});

describe('User Login', function(){

	var newUser = new userSchema({username: 'steven', password: 'pazzwordzz'});

	it('should be a schema', function(){
		expect(userSchema).to.be.a('function');
	});

	it('should recognize incorrect user', function(){
		expect(newUser.username).to.not.equal('mike');
	})

	it('should recognize incorrect passwords', function(){
		expect(newUser.password).to.not.equal('password');
	})

	it('should post to /login upon successful login', function(){
		if (newUser) {
			request(server).post('/login').send(newUser).expect(200);	
		}
	})

})