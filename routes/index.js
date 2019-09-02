const appRoot = require('app-root-path')

// Routes
const clientAuth = require('./api/v1/client/users/auth')
const companySettings = require('./api/v1/client/users/company')

// Middlewares
const auth = require(appRoot+"/middlewares/auth")

module.exports = function(app){
	// ...........Client...........
	// Auth
	app.use('/api', clientAuth)
	// Company settings
	app.use('/api/settings', auth, companySettings)
}