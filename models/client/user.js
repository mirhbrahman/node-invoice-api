const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	// User/Company details
	company_name: { type: String,minlength: 2, maxlength: 100 },
	company_email: { type: String, required: true, minlength: 2, maxlength: 256 },
	company_password: { type: String, required: true, minlength: 6, maxlength: 256 },
	company_reg_no: { type: String, minlength: 2, maxlength: 50},
	country_id: { type: Schema.Types.ObjectId },
	vat_no: { type: String, minlength: 2, maxlength: 100 },
	default_vat: { type: Number, max: 100, default: 0 },
	logo: { type: String}, 
	subscription: { type: Number, default: 0 },
	status: { type: Boolean, default: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
	// Address
	address: { type: String },
	post_code: { type: String, maxlength: 50 },
	city: { type: String, maxlength: 100 },
	web: { type: String },
	// Contact person
	ctp_first_name: { type: String, minlength: 2, maxlength: 50 },
	ctp_last_name: { type: String, minlength: 2, maxlength: 50 },
	ctp_email: { type: String, minlength: 2, maxlength: 256 },
	ctp_phone: { type: String, minlength: 8, maxlength: 20 },
	ctp_phone2: { type: String, minlength: 8, maxlength: 20 },
})

const User = mongoose.model('User', userSchema)
module.exports = User