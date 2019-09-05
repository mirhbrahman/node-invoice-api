const mongoose = require('mongoose')
const Schema = mongoose.Schema

const customerSchema = new Schema({
	// Customer details
	company: { type: Schema.Types.ObjectId, ref: 'User' },
	company_name: { type: String, required: true, minlength: 2, maxlength: 100 },
	company_reg_no: { type: String, minlength: 2, maxlength: 50 },
	vat_no: { type: String, minlength: 2, maxlength: 100 },
	title: { type: String, minlength:2, maxlength: 100 },
	status: { type: Boolean, default: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	// Contact person
	first_name: { type: String, required: true, minlength: 2, maxlength: 50 },
	last_name: { type: String, required: true, minlength: 2, maxlength: 50 },
	email: { type: String, required: true, minlength: 2, maxlength: 256 },
	phone: { type: String, minlength: 8, maxlength: 20 },
	phone2: { type: String, minlength: 8, maxlength: 20 },
	// Address
	address: { type: String },
	post_code: { type: String, maxlength: 50 },
	city: { type: String, maxlength: 100 },
	country_id: { type: Schema.Types.ObjectId },
	web: { type: String }
})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer