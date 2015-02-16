var mainConfig = {
  port: process.env.PORT || 4500,
  env: process.env.NODE_ENV
};

_.merge(mainConfig, require('./' + process.env.NODE_ENV) || {});


module.exports = mainConfig;
