const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
	// Product info
	company: { type: Schema.Types.ObjectId, ref: 'User' },
	name: { type: String, required: true, minlength: 2, maxlength: 255 },
	note: { type: String, maxlength: 255 },
	unit: { type: String, required: true, minlength: 1, maxlength: 20 },
	vat: { type: Number, min: 0, max: 100 },
	price: { type: Number, required: true },
	status: { type: Boolean, default: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product