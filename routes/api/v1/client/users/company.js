const appRoot = require('app-root-path')
const express = require('express')
const router = express.Router()

// Controller
const { putCompanySettings, getCompanySettings } = require(appRoot + '/controllers/client/users/companyController')

// @route  POST /api/settings/company
// @des    Company settings
// @access Private
router.put('/company', putCompanySettings)

// @route  GET /api/settings/company
// @des    Get Company settings
// @access Private
router.get('/company', getCompanySettings)


module.exports = router