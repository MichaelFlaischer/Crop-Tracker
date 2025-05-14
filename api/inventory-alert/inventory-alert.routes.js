import express from 'express'
import { getInventoryAlerts, getInventoryAlertById, addInventoryAlert, updateInventoryAlert, deleteInventoryAlert } from './inventory-alert.controller.js'

export const inventoryalertRoutes = express.Router()

inventoryalertRoutes.get('/', getInventoryAlerts)
inventoryalertRoutes.get('/:id', getInventoryAlertById)
inventoryalertRoutes.post('/', addInventoryAlert)
inventoryalertRoutes.put('/:id', updateInventoryAlert)
inventoryalertRoutes.delete('/:id', deleteInventoryAlert)
