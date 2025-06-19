import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const COLLECTION_NAME = 'FieldOperations'

export async function query() {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.find().toArray()
}

export async function getById(operationId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.findOne({ _id: toMongoId(operationId) })
}

export async function add(operation) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const res = await collection.insertOne(operation)
  return { ...operation, _id: res.insertedId }
}

export async function update(operationId, operation) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  delete operation._id
  const id = toMongoId(operationId)
  await collection.updateOne({ _id: id }, { $set: operation })
  return { ...operation, _id: id }
}

export async function remove(operationId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  await collection.deleteOne({ _id: toMongoId(operationId) })
}

function toMongoId(id) {
  if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
    return new ObjectId(id)
  }
  return id
}
