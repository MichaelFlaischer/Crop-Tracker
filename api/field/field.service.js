import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const COLLECTION_NAME = 'Fields'

export async function query() {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.find().toArray()
}

export async function getById(fieldId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.findOne({ _id: toMongoId(fieldId) })
}

export async function add(field) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const res = await collection.insertOne(field)
  return { ...field, _id: res.insertedId }
}

export async function update(fieldId, field) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  delete field._id
  const id = toMongoId(fieldId)
  await collection.updateOne({ _id: id }, { $set: field })
  return { ...field, _id: id }
}

export async function remove(fieldId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  await collection.deleteOne({ _id: toMongoId(fieldId) })
}

function toMongoId(id) {
  if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
    return new ObjectId(id)
  }
  throw new Error('Invalid ID format')
}
