const express = require('express')
const authController = require('../Controllers/authController')

const router = express.Router()

router.route('/login').post(authController.login);
router.route('/forgotPassword').post(authController.forgotPassword)
router.route('/resetPassword/:token').patch(authController.resetPassword)
router.route('/createUser').post(authController.createUser);
router.delete('/deleteUser/:id', authController.deleteUser);
router.get('/getUser', authController.getAllUsers);

module.exports = router