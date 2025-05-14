import express from 'express'
import {
  getCustomerOrderItems,
  getCustomerOrderItemById,
  addCustomerOrderItem,
  updateCustomerOrderItem,
  deleteCustomerOrderItem,
} from './customer-order-item.controller.js'

export const customerorderitemRoutes = express.Router()

customerorderitemRoutes.get('/', getCustomerOrderItems)
customerorderitemRoutes.get('/:id', getCustomerOrderItemById)
customerorderitemRoutes.post('/', addCustomerOrderItem)
customerorderitemRoutes.put('/:id', updateCustomerOrderItem)
customerorderitemRoutes.delete('/:id', deleteCustomerOrderItem)
