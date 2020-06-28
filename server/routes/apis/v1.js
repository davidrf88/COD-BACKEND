'use strict';

const registerController = require('../../controllers/apis/register');
const loginController = require('../../controllers/apis/account');
const UpdateProfileController = require('../../controllers/apis/UpdateProfile');
const dashboardController = require('../../controllers/apis/dashboard');
const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/account', loginController);
router.use('/UpdateProfile', UpdateProfileController);
router.use('/dashboard', dashboardController);

module.exports = router;