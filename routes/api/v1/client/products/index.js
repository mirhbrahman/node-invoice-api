const appRoot = require('app-root-path')
const express = require('express')
const router = express.Router()

// Controller
const { 
	getProducts, 
	getProduct, 
	postProducts,
	putProducts,
	deleteProduct
} = require(appRoot + '/controllers/client/products/productsController')

// @route  GET /api/products
// @des    Get products
// @access Private
router.get('/', getProducts)

// @route  GET /api/products/:id
// @des    Get product by id
// @access Private
router.get('/:id', getProduct)

// @route  POST /api/products
// @des    Post product
// @access Private
router.post('/', postProducts)

// @route  POST /api/products/:id
// @des    Update product
// @access Private
router.put('/:id', putProducts)

// @route  DELETE /api/products/:id
// @des    Delete product
// @access Private
router.delete('/:id', deleteProduct)



module.exports = router