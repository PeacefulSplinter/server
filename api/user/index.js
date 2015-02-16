var express = require('express');
var controller = require('userController.js');

var router = express.Router();

router.post('/api/v1/login', controller.login);
router.post('/api/v1/register', controller.register);

module.exports = router;

