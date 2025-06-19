import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const COLLECTION_NAME = 'Crops'

export async function query() {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.find().toArray()
}

export async function getById(cropId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.findOne({ _id: toMongoId(cropId) })
}

export async function add(crop) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const res = await collection.insertOne(crop)
  return { ...crop, _id: res.insertedId }
}

export async function update(cropId, crop) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  delete crop._id
  await collection.updateOne({ _id: toMongoId(cropId) }, { $set: crop })
  return { ...crop, _id: toMongoId(cropId) }
}

export async function remove(cropId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  await collection.deleteOne({ _id: toMongoId(cropId) })
}

function toMongoId(id) {
  if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
    return new ObjectId(id)
  }
  throw new Error('Invalid ID format')
}
