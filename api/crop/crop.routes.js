import express from 'express'
import { getCrops, getCropById, addCrop, updateCrop, deleteCrop } from './crop.controller.js'

export const cropRoutes = express.Router()

cropRoutes.get('/', getCrops)
cropRoutes.get('/:id', getCropById)
cropRoutes.post('/', addCrop)
cropRoutes.put('/:id', updateCrop)
cropRoutes.delete('/:id', deleteCrop)
