import express from 'express'
import {
  getOrderItems,
  getOrderItemByIdController,
  getItemsByOrderId,
  getItemsByCropAndStatus,
  addOrderItemController,
  updateOrderItemController,
  deleteOrderItemController,
  removeItemsByOrderId,
} from './customer-order-item.controller.js'

export const customerOrderItemRoutes = express.Router()

// שליפת כל הפריטים
customerOrderItemRoutes.get('/', getOrderItems)

// שליפת פריט לפי מזהה
customerOrderItemRoutes.get('/:id', getOrderItemByIdController)

// שליפת פריטים לפי מזהה הזמנה
customerOrderItemRoutes.get('/by-order/:orderId', getItemsByOrderId)

// שליפת פריטים לפי סוג יבול וסטטוס הזמנה
customerOrderItemRoutes.get('/by-crop/:cropId/status/:status', getItemsByCropAndStatus)

// הוספת פריט חדש
customerOrderItemRoutes.post('/', addOrderItemController)

// עדכון פריט קיים
customerOrderItemRoutes.put('/:id', updateOrderItemController)

customerOrderItemRoutes.delete('/by-order/:orderId', removeItemsByOrderId)
// מחיקת פריט
customerOrderItemRoutes.delete('/:id', deleteOrderItemController)
