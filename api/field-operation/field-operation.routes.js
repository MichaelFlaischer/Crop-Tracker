import express from 'express'
import { getFieldOperations, getFieldOperationById, addFieldOperation, updateFieldOperation, deleteFieldOperation } from './field-operation.controller.js'

export const fieldoperationRoutes = express.Router()

fieldoperationRoutes.get('/', getFieldOperations)
fieldoperationRoutes.get('/:id', getFieldOperationById)
fieldoperationRoutes.post('/', addFieldOperation)
fieldoperationRoutes.put('/:id', updateFieldOperation)
fieldoperationRoutes.delete('/:id', deleteFieldOperation)
