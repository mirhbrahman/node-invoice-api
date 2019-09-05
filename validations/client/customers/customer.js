const Joi = require('@hapi/joi')
const appRoot = require('app-root-path')
const validationErrorMessage = require(appRoot+'/utils/validationErrorMessage')

module.exports = data => {

	const schema = {
		company_name: Joi.string()
			.min(2)
			.max(100)
			.required(),
		company_reg_no: Joi.string()
			.min(2)
			.max(50)
			.allow(null),
		vat_no: Joi.string()
			.min(2)
			.max(100)
			.allow(null),
		first_name: Joi.string()
			.min(2)
			.max(50)
			.required(),
		last_name: Joi.string()
			.min(2)
			.max(50)
			.required(),
		email: Joi.string()
			.min(2)
			.max(256)
			.required(),
		phone: Joi.string()
			.min(8)
			.max(20)
			.allow(null),
		phone2: Joi.string()
			.min(8)
			.max(20)
			.allow(null),
		address: Joi.string()
			.max(1000)
			.allow(null),
		post_code: Joi.string()
			.max(50)
			.allow(null),
		city: Joi.string()
			.max(100)
			.allow(null),
		country_id: Joi.string()
			.allow(null),
		web: Joi.string()
			.max(1000)
			.allow(null)
		
	}

	return validationErrorMessage(data, schema)
}

