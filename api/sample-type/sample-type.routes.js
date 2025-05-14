import express from 'express'
import { getSampleTypes, getSampleTypeById, addSampleType, updateSampleType, deleteSampleType } from './sample-type.controller.js'

const router = express.Router()

router.get('/', getSampleTypes)
router.get('/:id', getSampleTypeById)
router.post('/', addSampleType)
router.put('/:id', updateSampleType)
router.delete('/:id', deleteSampleType)

export default router
