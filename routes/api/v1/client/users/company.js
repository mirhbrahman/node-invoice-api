const appRoot = require('app-root-path')
const express = require('express')
const router = express.Router()

// Controller
const { putCompanySettings } = require(appRoot + '/controllers/client/users/companyController')

// @route  POST /api/settings/company
// @des    Company settings
// @access Private
router.put('/company', putCompanySettings)


module.exports = router