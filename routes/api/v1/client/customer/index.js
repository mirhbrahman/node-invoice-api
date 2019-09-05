const appRoot = require('app-root-path')
const express = require('express')
const router = express.Router()

// Controller
const { 
	getCustomers, 
	getCustomer, 
	postCustomers,
	putCustomers,
	deleteCustomer
} = require(appRoot + '/controllers/client/customers/customersController')

// @route  GET /api/customers
// @des    Get customers
// @access Private
router.get('/', getCustomers)

// @route  GET /api/customers/:id
// @des    Get customer by id
// @access Private
router.get('/:id', getCustomer)

// @route  POST /api/customers
// @des    Post customer
// @access Private
router.post('/', postCustomers)

// @route  POST /api/customers/:id
// @des    Update customer
// @access Private
router.put('/:id', putCustomers)

// @route  DELETE /api/customers/:id
// @des    Delete customer
// @access Private
router.delete('/:id', deleteCustomer)



module.exports = router