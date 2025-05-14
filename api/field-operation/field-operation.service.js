import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('FieldOperations')
  return await collection.find().toArray()
}

export async function getById(operationId) {
  const collection = await dbService.getCollection('FieldOperations')
  return await collection.findOne({ _id: new ObjectId(operationId) })
}

export async function add(operation) {
  const collection = await dbService.getCollection('FieldOperations')
  const res = await collection.insertOne(operation)
  return { ...operation, _id: res.insertedId }
}

export async function update(operationId, operation) {
  const collection = await dbService.getCollection('FieldOperations')
  delete operation._id
  await collection.updateOne({ _id: new ObjectId(operationId) }, { $set: operation })
  return { ...operation, _id: new ObjectId(operationId) }
}

export async function remove(operationId) {
  const collection = await dbService.getCollection('FieldOperations')
  await collection.deleteOne({ _id: new ObjectId(operationId) })
}
