const express = require('express')
const asyncErrorHandler = require('../Utils/asyncErrorHandler')
const authController = require('../Controllers/authController')

const router = express.Router()

router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/resetPassword/:token').patch(authController.resetPassword)
router.route('/createUser').post(authController.createUser);
module.exports = router