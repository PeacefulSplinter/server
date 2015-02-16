module.exports = function(app){
  //create app.use per new routes
  //will find index.js by default
  app.use('/api/user', require('./api/user'));
};
