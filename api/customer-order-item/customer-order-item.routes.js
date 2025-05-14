import express from 'express'
import {
  getCustomerOrderItems,
  getCustomerOrderItemById,
  addCustomerOrderItem,
  updateCustomerOrderItem,
  deleteCustomerOrderItem,
} from './customer-order-item.controller.js'

const router = express.Router()

router.get('/', getCustomerOrderItems)
router.get('/:id', getCustomerOrderItemById)
router.post('/', addCustomerOrderItem)
router.put('/:id', updateCustomerOrderItem)
router.delete('/:id', deleteCustomerOrderItem)

export default router
