import express from 'express'
import {
  getInventoryInWarehouse,
  getInventoryItemById,
  addInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} from './inventory-in-warehouse.controller.js'

const router = express.Router()

router.get('/', getInventoryInWarehouse)
router.get('/:id', getInventoryItemById)
router.post('/', addInventoryItem)
router.put('/:id', updateInventoryItem)
router.delete('/:id', deleteInventoryItem)

export default router
