import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('customerOrderItems')
  return await collection.find().toArray()
}

export async function getById(itemId) {
  const collection = await getCollection('customerOrderItems')
  return await collection.findOne({ _id: new ObjectId(itemId) })
}

export async function add(item) {
  const collection = await getCollection('customerOrderItems')
  const res = await collection.insertOne(item)
  return { ...item, _id: res.insertedId }
}

export async function update(itemId, item) {
  const collection = await getCollection('customerOrderItems')
  delete item._id
  await collection.updateOne({ _id: new ObjectId(itemId) }, { $set: item })
  return { ...item, _id: new ObjectId(itemId) }
}

export async function remove(itemId) {
  const collection = await getCollection('customerOrderItems')
  await collection.deleteOne({ _id: new ObjectId(itemId) })
}
