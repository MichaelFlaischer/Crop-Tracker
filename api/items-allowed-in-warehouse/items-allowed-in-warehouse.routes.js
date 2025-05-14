import express from 'express'
import {
  getItemsAllowedInWarehouse,
  getItemAllowedById,
  addItemAllowed,
  updateItemAllowed,
  deleteItemAllowed,
} from './items-allowed-in-warehouse.controller.js'

const router = express.Router()

router.get('/', getItemsAllowedInWarehouse)
router.get('/:id', getItemAllowedById)
router.post('/', addItemAllowed)
router.put('/:id', updateItemAllowed)
router.delete('/:id', deleteItemAllowed)

export default router
