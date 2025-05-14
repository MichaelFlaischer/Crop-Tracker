import express from 'express'
import { getCustomerOrders, getCustomerOrderById, addCustomerOrder, updateCustomerOrder, deleteCustomerOrder } from './customer-order.controller.js'

export const customerorderRoutes = express.Router()

customerorderRoutes.get('/', getCustomerOrders)
customerorderRoutes.get('/:id', getCustomerOrderById)
customerorderRoutes.post('/', addCustomerOrder)
customerorderRoutes.put('/:id', updateCustomerOrder)
customerorderRoutes.delete('/:id', deleteCustomerOrder)
