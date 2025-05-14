import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('CustomerOrders')
  return await collection.find().toArray()
}

export async function getById(orderId) {
  const collection = await dbService.getCollection('CustomerOrders')
  return await collection.findOne({ _id: new ObjectId(orderId) })
}

export async function add(order) {
  const collection = await dbService.getCollection('CustomerOrders')
  const res = await collection.insertOne(order)
  return { ...order, _id: res.insertedId }
}

export async function update(orderId, order) {
  const collection = await dbService.getCollection('CustomerOrders')
  delete order._id
  await collection.updateOne({ _id: new ObjectId(orderId) }, { $set: order })
  return { ...order, _id: new ObjectId(orderId) }
}

export async function remove(orderId) {
  const collection = await dbService.getCollection('CustomerOrders')
  await collection.deleteOne({ _id: new ObjectId(orderId) })
}
