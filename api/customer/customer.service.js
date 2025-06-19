import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const COLLECTION_NAME = 'Customers'

function toMongoId(id) {
  if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
    return new ObjectId(id)
  }
  throw new Error('Invalid ID format')
}

export async function query() {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.find().toArray()
}

export async function getById(customerId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.findOne({ _id: toMongoId(customerId) })
}

export async function add(customer) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const res = await collection.insertOne(customer)
  return { ...customer, _id: res.insertedId }
}

export async function update(customerId, customer) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  delete customer._id
  await collection.updateOne({ _id: toMongoId(customerId) }, { $set: customer })
  return { ...customer, _id: toMongoId(customerId) }
}

export async function remove(customerId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  await collection.deleteOne({ _id: toMongoId(customerId) })
}
