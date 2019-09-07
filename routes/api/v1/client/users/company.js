const appRoot = require('app-root-path')
const express = require('express')
const router = express.Router()

// Controller
const { putCompanySettings, getCompanySettings, putUploadLogo } = require(appRoot + '/controllers/client/users/companyController')

// Upload image middleware
const { multerParser } = require(appRoot+'/utils/cloudinary')

// @route  POST /api/settings/company
// @des    Company settings
// @access Private
router.put('/company', putCompanySettings)

// @route  GET /api/settings/company
// @des    Get Company settings
// @access Private
router.get('/company', getCompanySettings)

// @route  PUT /api/settings/company/logo
// @des    Upload company logo
// @access Private
router.put('/company/logo', multerParser.single('logo'), putUploadLogo)


module.exports = router