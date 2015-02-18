module.exports = function(app){
  //create app.use per new routes
  //will find index.js by default
  app.use('/api/local', require('./api/user/local'));
  app.use('/api/fb', require('./api/user/facebook'));
  app.use('/api/g', require('./api/user/google'));
};
