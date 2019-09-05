const Joi = require('@hapi/joi')
const appRoot = require('app-root-path')
const validationErrorMessage = require(appRoot+'/utils/validationErrorMessage')

module.exports = data => {

	const schema = {
		name: Joi.string()
			.min(2)
			.max(255)
			.required(),
		note: Joi.string()
			.max(255)
			.allow(null),
		unit: Joi.string()
			.min(1)
			.max(20)
			.required(),
		vat: Joi.number()
			.integer()
			.min(0)
			.max(100),
		price: Joi.number()
			.integer()
			.required()
	}

	return validationErrorMessage(data, schema)
}

