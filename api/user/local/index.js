var express = require('express');
var controller = require('./userController.js');

var router = express.Router();

router.post('/local/login', controller.login);
router.post('/local/register', controller.register);

module.exports = router;