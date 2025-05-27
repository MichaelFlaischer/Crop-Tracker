import express from 'express'
import {
  getWarehouses,
  getWarehouseById,
  addWarehouse,
  updateWarehouse,
  deleteWarehouse,
  getWarehousesByCrop,
  updateWarehouseCropQuantity,
} from './warehouse.controller.js'

export const warehouseRoutes = express.Router()

warehouseRoutes.get('/', getWarehouses)
warehouseRoutes.get('/:id', getWarehouseById)
warehouseRoutes.post('/', addWarehouse)
warehouseRoutes.put('/:id', updateWarehouse)
warehouseRoutes.delete('/:id', deleteWarehouse)
warehouseRoutes.get('/by-crop/:cropId', getWarehousesByCrop)
warehouseRoutes.post('/update-crop-quantity', updateWarehouseCropQuantity)
