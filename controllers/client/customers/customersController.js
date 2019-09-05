const appRoot = require('app-root-path')
const { somethingError, noDataFound } = require(appRoot+'/helpers/error_response')

// Validation
const validateCustomerInput = require(appRoot+'/validations/client/customers/customer')

// Models
const Customer = require(appRoot+'/models/client/customer')


// Get customers data
exports.getCustomers = (req, res) => {
	Customer.find({ company: req.user._id})
	.populate({ path: 'company', select: ['_id', 'company_name'] })
	.then(customers=>{
		if(customers){
			return res.json({
				success: true,
				customers: customers
			})
		}
		else{
			noDataFound(res)
		}
	})
	.catch(err=>somethingError(res, err))
}

// Get customer by id
exports.getCustomer = (req, res) => {
	Customer.findOne({ 
		company: req.user._id,
		_id: req.params.id
	})
	.populate({ path: 'company', select: ['_id', 'company_name'] })
	.then(customer=>{
		if(customer){
			return res.json({
				success: true,
				customer: customer
			})
		}
		else{
			noDataFound(res)
		}
	})
	.catch(err=>somethingError(res, err))
}

// Add new customer
exports.postCustomers = (req, res) => {
	// Validate customer input data
	const errors = validateCustomerInput(req.body)
	if(errors) return res.status(400).json(errors)

  // Extract body data
const {
	company_name,
	company_reg_no,
	vat_no,
	first_name,
	last_name,
	email,
	phone,
	phone2,
	address,
	post_code,
	city,
	country_id,
	web
} = req.body

	// Create a customer
	const customer = new Customer()

	customer.company = req.user._id
	customer.company_name = company_name
	customer.company_reg_no = company_reg_no
	customer.vat_no = vat_no
	customer.first_name = first_name
	customer.last_name = last_name
	customer.email = email
	customer.phone = phone
	customer.phone2 = phone2
	customer.address = address
	customer.post_code = post_code
	customer.city = city
	customer.country_id = country_id
	customer.web = web

	// Save to DB
	customer.save()
	.then(customer=>{
		if(customer){
			return res.status(201).json({
				success: true,
				customer: customer
			})
		}
		else{
			noDataFound(res)
		}
	})
	.catch(err=>somethingError(res, err))
}

// Update customer
exports.putCustomers = (req, res) => {
	// Validate customer input data
	const errors = validateCustomerInput(req.body)
	if(errors) return res.status(400).json(errors)

	// Extract body data
const {
	company_name,
	company_reg_no,
	vat_no,
	first_name,
	last_name,
	email,
	phone,
	phone2,
	address,
	post_code,
	city,
	country_id,
	web
} = req.body

	// Find customer
	Customer.findOne({ company: req.user._id, _id: req.params.id })
	.then(customer=>{
		if(customer){
				// Update data
				customer.company_name = company_name
				customer.company_reg_no = company_reg_no
				customer.vat_no = vat_no
				customer.first_name = first_name
				customer.last_name = last_name
				customer.email = email
				customer.phone = phone
				customer.phone2 = phone2
				customer.address = address
				customer.post_code = post_code
				customer.city = city
				customer.country_id = country_id
				customer.web = web
				customer.updated_at = Date.now()

					// Save to DB
					customer.save()
					.then(customer=>{
						if(customer){
							return res.json({
								success: true,
								customer: customer
							})
						}
					})
					.catch(err=>somethingError(res, err))
				}
				else{
					noDataFound(res)
				}
			})
	.catch(err=>somethingError(res, err))
}

// Delete customer data
exports.deleteCustomer = (req, res) => {
	Customer.findOne({ 
		company: req.user._id,
		_id: req.params.id
	})
	.then(customer=>{
		if(customer){
			customer
			.remove()
			.then(customer=>{
				return res.json({
					success: true,
					customer: customer
				})
			})
			.catch(err=>somethingError(res, err))
		}else{
			noDataFound(res)
		}
	})
	.catch(err=>somethingError(res, err))
}



