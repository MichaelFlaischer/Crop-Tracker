import express from 'express'
import { getTrucks, getTruckById, addTruck, updateTruck, deleteTruck } from './truck.controller.js'

const router = express.Router()

router.get('/', getTrucks)
router.get('/:id', getTruckById)
router.post('/', addTruck)
router.put('/:id', updateTruck)
router.delete('/:id', deleteTruck)

export default router
