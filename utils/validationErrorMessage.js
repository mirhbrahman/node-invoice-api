const Joi = require('@hapi/joi')

module.exports = (data, schema) => {
	let errors = {};

	const { error } = Joi.validate(data, schema, { abortEarly: false })

	if(error){
		// List all errors
		error.details.map(err => {
      errors[err.path] = capitalizeFirstLetter(removeQuote(err.message));
    })
	}else{
		errors = false
	}

	return errors;
}

function removeQuote(string){
	return string.replace(/['"]+/g, '')
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}