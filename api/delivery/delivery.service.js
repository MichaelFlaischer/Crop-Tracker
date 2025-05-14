import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('Deliveries')
  return await collection.find().toArray()
}

export async function getById(deliveryId) {
  const collection = await dbService.getCollection('Deliveries')
  return await collection.findOne({ _id: new ObjectId(deliveryId) })
}

export async function add(delivery) {
  const collection = await dbService.getCollection('Deliveries')
  const res = await collection.insertOne(delivery)
  return { ...delivery, _id: res.insertedId }
}

export async function update(deliveryId, delivery) {
  const collection = await dbService.getCollection('Deliveries')
  delete delivery._id
  await collection.updateOne({ _id: new ObjectId(deliveryId) }, { $set: delivery })
  return { ...delivery, _id: new ObjectId(deliveryId) }
}

export async function remove(deliveryId) {
  const collection = await dbService.getCollection('Deliveries')
  await collection.deleteOne({ _id: new ObjectId(deliveryId) })
}
