import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const ORDER_COLLECTION = 'CustomerOrders'

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
  const collection = await dbService.getCollection(ORDER_COLLECTION)
  const res = await collection.insertOne(order)
  return { ...order, _id: res.insertedId }
}

export async function updateOrder(orderId, order) {
  const collection = await dbService.getCollection(ORDER_COLLECTION)
  delete order._id
  await collection.updateOne({ _id: toMongoId(orderId) }, { $set: order })
  return { ...order, _id: toMongoId(orderId) }
}

export async function removeOrder(orderId) {
  const collection = await dbService.getCollection(ORDER_COLLECTION)
  await collection.deleteOne({ _id: toMongoId(orderId) })
}

function toMongoId(id) {
  if (typeof id === 'number') return id
  if (!isNaN(id) && /^\d+$/.test(id)) return +id
  try {
    return new ObjectId(id)
  } catch {
    throw new Error('Invalid ID format')
  }
}
