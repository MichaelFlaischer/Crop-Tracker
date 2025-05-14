import express from 'express'
import {
  getSowingAndHarvests,
  getSowingAndHarvestById,
  addSowingAndHarvest,
  updateSowingAndHarvest,
  deleteSowingAndHarvest,
} from './sowing-and-harvest.controller.js'

export const sowingandharvestRoutes = express.Router()

sowingandharvestRoutes.get('/', getSowingAndHarvests)
sowingandharvestRoutes.get('/:id', getSowingAndHarvestById)
sowingandharvestRoutes.post('/', addSowingAndHarvest)
sowingandharvestRoutes.put('/:id', updateSowingAndHarvest)
sowingandharvestRoutes.delete('/:id', deleteSowingAndHarvest)
