import express from 'express'
import { getDeliveries, getDeliveryById, addDelivery, updateDelivery, deleteDelivery } from './delivery.controller.js'

const router = express.Router()

router.get('/', getDeliveries)
router.get('/:id', getDeliveryById)
router.post('/', addDelivery)
router.put('/:id', updateDelivery)
router.delete('/:id', deleteDelivery)

export default router
