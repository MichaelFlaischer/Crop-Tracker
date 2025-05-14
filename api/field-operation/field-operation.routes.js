import express from 'express'
import { getFieldOperations, getFieldOperationById, addFieldOperation, updateFieldOperation, deleteFieldOperation } from './field-operation.controller.js'

const router = express.Router()

router.get('/', getFieldOperations)
router.get('/:id', getFieldOperationById)
router.post('/', addFieldOperation)
router.put('/:id', updateFieldOperation)
router.delete('/:id', deleteFieldOperation)

export default router
