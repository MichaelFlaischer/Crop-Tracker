import express from 'express'
import {
  getItemsAllowedInWarehouse,
  getItemAllowedById,
  addItemAllowed,
  updateItemAllowed,
  deleteItemAllowed,
} from './items-allowed-in-warehouse.controller.js'

export const itemsallowedinwarehouseRoutes = express.Router()

itemsallowedinwarehouseRoutes.get('/', getItemsAllowedInWarehouse)
itemsallowedinwarehouseRoutes.get('/:id', getItemAllowedById)
itemsallowedinwarehouseRoutes.post('/', addItemAllowed)
itemsallowedinwarehouseRoutes.put('/:id', updateItemAllowed)
itemsallowedinwarehouseRoutes.delete('/:id', deleteItemAllowed)
