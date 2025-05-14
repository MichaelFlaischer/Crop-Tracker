import express from 'express'
import { getCrops, getCropById, addCrop, updateCrop, deleteCrop } from './crop.controller.js'

const router = express.Router()

router.get('/', getCrops)
router.get('/:id', getCropById)
router.post('/', addCrop)
router.put('/:id', updateCrop)
router.delete('/:id', deleteCrop)

export default router
