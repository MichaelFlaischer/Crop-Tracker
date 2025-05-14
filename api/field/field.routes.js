import express from 'express'
import { getFields, getFieldById, addField, updateField, deleteField } from './field.controller.js'

const router = express.Router()

router.get('/', getFields)
router.get('/:id', getFieldById)
router.post('/', addField)
router.put('/:id', updateField)
router.delete('/:id', deleteField)

export default router
