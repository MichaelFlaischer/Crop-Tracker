import express from 'express'
import { getInventoryAlerts, getInventoryAlertById, addInventoryAlert, updateInventoryAlert, deleteInventoryAlert } from './inventory-alert.controller.js'

const router = express.Router()

router.get('/', getInventoryAlerts)
router.get('/:id', getInventoryAlertById)
router.post('/', addInventoryAlert)
router.put('/:id', updateInventoryAlert)
router.delete('/:id', deleteInventoryAlert)

export default router
