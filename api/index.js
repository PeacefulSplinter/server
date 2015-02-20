module.exports = function(app){
  //create app.use per new routes
  //will find index.js by default
  'use strict';

  app.use('/auth', require('./auth'));

};