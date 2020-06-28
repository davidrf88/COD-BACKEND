'use strict';
const passport = require('passport');
const express = require('express');
const loginService = require('../../services/authentication/login');

let router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), loginService.UpdateProfile);

module.exports = router;