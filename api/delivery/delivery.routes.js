import express from 'express'
import { getDeliveries, getDeliveryById, addDelivery, updateDelivery, removeDelivery } from './delivery.controller.js'

export const deliveryRoutes = express.Router()

deliveryRoutes.get('/', getDeliveries)
deliveryRoutes.get('/:id', getDeliveryById)
deliveryRoutes.post('/', addDelivery)
deliveryRoutes.put('/:id', updateDelivery)
deliveryRoutes.delete('/:id', removeDelivery)
