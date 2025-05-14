import express from 'express'
import {
  getDeliveryAssignments,
  getDeliveryAssignmentById,
  addDeliveryAssignment,
  updateDeliveryAssignment,
  deleteDeliveryAssignment,
} from './delivery-assignment.controller.js'

export const deliveryassignmentRoutes = express.Router()

deliveryassignmentRoutes.get('/', getDeliveryAssignments)
deliveryassignmentRoutes.get('/:id', getDeliveryAssignmentById)
deliveryassignmentRoutes.post('/', addDeliveryAssignment)
deliveryassignmentRoutes.put('/:id', updateDeliveryAssignment)
deliveryassignmentRoutes.delete('/:id', deleteDeliveryAssignment)
