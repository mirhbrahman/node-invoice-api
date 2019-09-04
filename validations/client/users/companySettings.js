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
		default_vat: Joi.number()
			.integer()
			.min(0)
			.max(100)
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
		web: Joi.string()
			.max(1000)
			.allow(null),
		ctp_first_name: Joi.string()
			.min(2)
			.max(50)
			.allow(null),
		ctp_last_name: Joi.string()
			.min(2)
			.max(50)
			.allow(null),
		ctp_email: Joi.string()
			.min(2)
			.max(256)
			.allow(null),
		ctp_phone: Joi.string()
			.min(8)
			.max(20)
			.allow(null),
		ctp_phone: Joi.string()
			.min(8)
			.max(20)
			.allow(null)
	}

	return validationErrorMessage(data, schema)
}

