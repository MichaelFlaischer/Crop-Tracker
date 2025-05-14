import express from 'express'
import {
  getInventoryInWarehouse,
  getInventoryItemById,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from './inventory-in-warehouse.controller.js'

export const inventoryinwarehouseRoutes = express.Router()

inventoryinwarehouseRoutes.get('/', getInventoryInWarehouse)
inventoryinwarehouseRoutes.get('/:id', getInventoryItemById)
inventoryinwarehouseRoutes.post('/', addInventoryItem)
inventoryinwarehouseRoutes.put('/:id', updateInventoryItem)
inventoryinwarehouseRoutes.delete('/:id', deleteInventoryItem)
