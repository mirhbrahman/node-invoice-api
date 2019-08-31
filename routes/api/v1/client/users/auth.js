const appRoot = require('app-root-path')
const express = require('express')
const router = express.Router()

// Controller
const { postRegister, postLogin } = require(appRoot + '/controllers/client/users/authController')

// @route  POST /api/register
// @des    Company register
// @access Public
router.post('/register', postRegister)

// @route  POST /api/login
// @des    Company login
// @access Public
router.post('/login', postLogin)

module.exports = router