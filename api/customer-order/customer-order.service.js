import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const ORDER_COLLECTION = 'CustomerOrders'

function toMongoId(id) {
  if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
    return new ObjectId(id)
  }
  return id
}

export async function queryOrders() {
  const collection = await dbService.getCollection(ORDER_COLLECTION)
  return await collection.find().toArray()
}

export async function getOrderById(orderId) {
  const collection = await dbService.getCollection(ORDER_COLLECTION)
  return await collection.findOne({ _id: toMongoId(orderId) })
}

export async function getOrdersByCustomerId(customerId) {
  const collection = await dbService.getCollection(ORDER_COLLECTION)
  return await collection.find({ customerId: toMongoId(customerId) }).toArray()
}

export async function addOrder(order) {
  const newOrder = {
    ...order,
    customerId: toMongoId(order.customerId),
    approvedBy: order.approvedBy ? toMongoId(order.approvedBy) : null,
    orderDate: new Date(order.orderDate),
    desiredDeliveryDate: order.desiredDeliveryDate ? new Date(order.desiredDeliveryDate) : null,
    approvedAt: order.approvedAt ? new Date(order.approvedAt) : null,
  }

  const collection = await dbService.getCollection(ORDER_COLLECTION)
  const res = await collection.insertOne(newOrder)
  return { ...newOrder, _id: res.insertedId }
}

export async function updateOrder(orderId, order) {
  const collection = await dbService.getCollection(ORDER_COLLECTION)
  delete order._id

  const updatedOrder = {
    ...order,
    customerId: toMongoId(order.customerId),
    approvedBy: order.approvedBy ? toMongoId(order.approvedBy) : null,
    orderDate: new Date(order.orderDate),
    desiredDeliveryDate: order.desiredDeliveryDate ? new Date(order.desiredDeliveryDate) : null,
    approvedAt: order.approvedAt ? new Date(order.approvedAt) : null,
  }

  await collection.updateOne({ _id: toMongoId(orderId) }, { $set: updatedOrder })
  return { ...updatedOrder, _id: toMongoId(orderId) }
}

export async function removeOrder(orderId) {
  const collection = await dbService.getCollection(ORDER_COLLECTION)
  await collection.deleteOne({ _id: toMongoId(orderId) })
}
