const test = require('./api/v1/client/test')

module.exports = function(app){
	app.use('/api', test)
}