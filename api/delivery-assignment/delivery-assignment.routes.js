import express from 'express'
import {
  getDeliveryAssignments,
  getDeliveryAssignmentById,
  addDeliveryAssignment,
  updateDeliveryAssignment,
  deleteDeliveryAssignment,
} from './delivery-assignment.controller.js'

const router = express.Router()

router.get('/', getDeliveryAssignments)
router.get('/:id', getDeliveryAssignmentById)
router.post('/', addDeliveryAssignment)
router.put('/:id', updateDeliveryAssignment)
router.delete('/:id', deleteDeliveryAssignment)

export default router
