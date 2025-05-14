import express from 'express'
import { getWarehouses, getWarehouseById, addWarehouse, updateWarehouse, deleteWarehouse } from './warehouse.controller.js'

const router = express.Router()

router.get('/', getWarehouses)
router.get('/:id', getWarehouseById)
router.post('/', addWarehouse)
router.put('/:id', updateWarehouse)
router.delete('/:id', deleteWarehouse)

export default router
