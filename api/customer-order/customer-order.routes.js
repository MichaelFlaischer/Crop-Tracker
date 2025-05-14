import express from 'express'
import { getCustomerOrders, getCustomerOrderById, addCustomerOrder, updateCustomerOrder, deleteCustomerOrder } from './customer-order.controller.js'

const router = express.Router()

router.get('/', getCustomerOrders)
router.get('/:id', getCustomerOrderById)
router.post('/', addCustomerOrder)
router.put('/:id', updateCustomerOrder)
router.delete('/:id', deleteCustomerOrder)

export default router
