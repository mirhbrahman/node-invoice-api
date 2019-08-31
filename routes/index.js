const clientAuth = require('./api/v1/client/users/auth')

module.exports = function(app){
	// ...........Client...........
	// Auth
	app.use('/api', clientAuth)
}