const Joi = require('@hapi/joi')
const appRoot = require('app-root-path')
const validationErrorMessage = require(appRoot+'/utils/validationErrorMessage')

module.exports = data => {

	const schema = {
		email: Joi.string()
			.min(2)
			.max(255)
			.email()
			.required(),
		password: Joi.string()
			.max(50)
			.min(6)
			.required()
	}

	return validationErrorMessage(data, schema)
}

