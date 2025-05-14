import express from 'express'
import { getTrucks, getTruckById, addTruck, updateTruck, deleteTruck } from './truck.controller.js'

export const truckRoutes = express.Router()

truckRoutes.get('/', getTrucks)
truckRoutes.get('/:id', getTruckById)
truckRoutes.post('/', addTruck)
truckRoutes.put('/:id', updateTruck)
truckRoutes.delete('/:id', deleteTruck)
