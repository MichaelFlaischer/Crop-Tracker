import express from 'express'
import {
  getCustomerOrders,
  getCustomerOrderById,
  getOrdersByCustomer,
  addCustomerOrder,
  updateCustomerOrder,
  deleteCustomerOrder,
} from './customer-order.controller.js'

export const customerorderRoutes = express.Router()

customerorderRoutes.get('/', getCustomerOrders)
customerorderRoutes.get('/:id', getCustomerOrderById)
customerorderRoutes.get('/by-customer/:customerId', getOrdersByCustomer)
customerorderRoutes.post('/', addCustomerOrder)
customerorderRoutes.put('/:id', updateCustomerOrder)
customerorderRoutes.delete('/:id', deleteCustomerOrder)
