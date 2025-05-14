import express from 'express'
import { getCustomers, getCustomerById, addCustomer, updateCustomer, deleteCustomer } from './customer.controller.js'

export const customerRoutes = express.Router()

customerRoutes.get('/', getCustomers)
customerRoutes.get('/:id', getCustomerById)
customerRoutes.post('/', addCustomer)
customerRoutes.put('/:id', updateCustomer)
customerRoutes.delete('/:id', deleteCustomer)
