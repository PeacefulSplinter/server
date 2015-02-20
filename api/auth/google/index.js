var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();

router.get('/google', passport.authenticate('google'));

router.get('/google/callback', passport.authenticate('google'), function (req, res) {
});

module.exports = router;
