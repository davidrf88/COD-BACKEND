'use strict';

const express = require('express');
const loginService = require('../../services/authentication/login');

let router = express.Router();

router.post('/logging', loginService.logging);
router.get('/GetStats', loginService.GetStats);

module.exports = router;