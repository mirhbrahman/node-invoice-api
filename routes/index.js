const appRoot = require('app-root-path')

// Routes
const clientAuth = require('./api/v1/client/users/auth')
const companySettings = require('./api/v1/client/users/company')
const customers = require('./api/v1/client/customers')
const products = require('./api/v1/client/products')

// Middlewares
const auth = require(appRoot+"/middlewares/auth")

module.exports = function(app){
	// ...........Client...........
	// Auth
	app.use('/api', clientAuth)
	// Company settings
	app.use('/api/settings', auth, companySettings)
	// Customers
	app.use('/api/customers', auth, customers)
	// Products
	app.use('/api/products', auth, products)


	// Handle error
	app.use(function (err, req, res, next) {
	  res.status(500).json({
	  	success: false,
	  	message: err.message
	  })
	})
	// 404 not found
	app.use('*', (req, res)=>{
		res.status(404).json({
			success: false,
			message: '404 not found.'
		})
	})
}