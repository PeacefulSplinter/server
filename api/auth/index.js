
  //create app.use per new routes
  //will find index.js by default

  var express = require('express');
  var passport = require('passport');
  var User = require('../user/userModel');

  var router = express.Router();
  router.use(passport.initialize());

  // Passport Configuration
  require('./facebook/facebookController').setup(User);
  // require('./google/googleController').setup(User);

  router.post('/local', require('./local'));
  router.get('/fb', require('./facebook'));
  // router.get('/g', require('./google'));

  module.exports = router