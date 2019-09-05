const appRoot = require('app-root-path')
const { somethingError, noDataFound } = require(appRoot+'/helpers/error_response')

// Validation
const validateProductInput = require(appRoot+'/validations/client/products/product')

// Models
const Product = require(appRoot+'/models/client/product')


// Get products data
exports.getProducts = (req, res) => {
	Product.find({ company: req.user._id})
	.populate({ path: 'company', select: ['_id', 'company_name'] })
	.then(products=>{
		if(products){
			return res.json({
				success: true,
				products: products
			})
		}
		else{
			noDataFound(res)
		}
	})
	.catch(err=>somethingError(res, err))
}

// Get product by id
exports.getProduct = (req, res) => {
	Product.findOne({ 
		company: req.user._id,
		_id: req.params.id
	})
	.populate({ path: 'company', select: ['_id', 'company_name'] })
	.then(product=>{
		if(product){
			return res.json({
				success: true,
				product: product
			})
		}
		else{
			noDataFound(res)
		}
	})
	.catch(err=>somethingError(res, err))
}

// Add new product
exports.postProducts = (req, res) => {
	// Validate product input data
	const errors = validateProductInput(req.body)
	if(errors) return res.status(400).json(errors)

 // Extract body data
	const {
		name,
		note,
		unit,
		vat,
		price
	} = req.body

	// Create a product
	const product = new Product()

	product.company = req.user._id
	product.name = name
	product.note = note
	product.unit = unit
	product.vat = vat ? vat : 0
	product.price = price

	// Save to DB
	product.save()
	.then(product=>{
		if(product){
			return res.status(201).json({
				success: true,
				product: product
			})
		}
		else{
			noDataFound(res)
		}
	})
	.catch(err=>somethingError(res, err))
}

// Update product
exports.putProducts = (req, res) => {
	// Validate product input data
	const errors = validateProductInput(req.body)
	if(errors) return res.status(400).json(errors)

	// Extract body data
const {
	name,
	note,
	unit,
	vat,
	price
} = req.body

	// Find product
	Product.findOne({ company: req.user._id, _id: req.params.id })
	.then(product=>{
		if(product){
				// Update data
				product.name = name
				product.note = note
				product.unit = unit
				product.vat = vat ? vat : 0
				product.price = price
				product.updated_at = Date.now()

					// Save to DB
					product.save()
					.then(product=>{
						if(product){
							return res.json({
								success: true,
								product: product
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

// Delete product data
exports.deleteProduct = (req, res) => {
	Product.findOne({ 
		company: req.user._id,
		_id: req.params.id
	})
	.then(product=>{
		if(product){
			product
			.remove()
			.then(product=>{
				return res.json({
					success: true,
					product: product
				})
			})
			.catch(err=>somethingError(res, err))
		}else{
			noDataFound(res)
		}
	})
	.catch(err=>somethingError(res, err))
}



