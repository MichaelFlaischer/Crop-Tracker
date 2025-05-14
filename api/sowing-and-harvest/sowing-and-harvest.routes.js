import express from 'express'
import {
  getSowingAndHarvests,
  getSowingAndHarvestById,
  addSowingAndHarvest,
  updateSowingAndHarvest,
  deleteSowingAndHarvest,
} from './sowing-and-harvest.controller.js'

const router = express.Router()

router.get('/', getSowingAndHarvests)
router.get('/:id', getSowingAndHarvestById)
router.post('/', addSowingAndHarvest)
router.put('/:id', updateSowingAndHarvest)
router.delete('/:id', deleteSowingAndHarvest)

export default router
