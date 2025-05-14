import express from 'express'
import { getCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer } from './customer.controller.js'

const router = express.Router()

router.get('/', getCustomers)
router.get('/:id', getCustomerById)
router.post('/', addCustomer)
router.put('/:id', updateCustomer)
router.delete('/:id', deleteCustomer)

export default router
