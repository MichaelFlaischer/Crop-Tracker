import express from 'express'
import { getFields, getFieldById, addField, updateField, deleteField } from './field.controller.js'

export const fieldRoutes = express.Router()

fieldRoutes.get('/', getFields)
fieldRoutes.get('/:id', getFieldById)
fieldRoutes.post('/', addField)
fieldRoutes.put('/:id', updateField)
fieldRoutes.delete('/:id', deleteField)
