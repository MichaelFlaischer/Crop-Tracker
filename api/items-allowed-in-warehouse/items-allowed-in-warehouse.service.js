import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('ItemsAllowedInWarehouse')
  return await collection.find().toArray()
}

export async function getById(itemId) {
  const collection = await dbService.getCollection('ItemsAllowedInWarehouse')
  return await collection.findOne({ _id: new ObjectId(itemId) })
}

export async function add(item) {
  const collection = await dbService.getCollection('ItemsAllowedInWarehouse')
  const res = await collection.insertOne(item)
  return { ...item, _id: res.insertedId }
}

export async function update(itemId, item) {
  const collection = await dbService.getCollection('ItemsAllowedInWarehouse')
  delete item._id
  await collection.updateOne({ _id: new ObjectId(itemId) }, { $set: item })
  return { ...item, _id: new ObjectId(itemId) }
}

export async function remove(itemId) {
  const collection = await dbService.getCollection('ItemsAllowedInWarehouse')
  await collection.deleteOne({ _id: new ObjectId(itemId) })
}
