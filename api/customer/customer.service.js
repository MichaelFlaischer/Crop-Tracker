import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('Customers')
  return await collection.find().toArray()
}

export async function getById(customerId) {
  const collection = await dbService.getCollection('Customers')
  return await collection.findOne({ _id: new ObjectId(customerId) })
}

export async function add(customer) {
  const collection = await dbService.getCollection('Customers')
  const res = await collection.insertOne(customer)
  return { ...customer, _id: res.insertedId }
}

export async function update(customerId, customer) {
  const collection = await dbService.getCollection('Customers')
  delete customer._id
  await collection.updateOne({ _id: new ObjectId(customerId) }, { $set: customer })
  return { ...customer, _id: new ObjectId(customerId) }
}

export async function remove(customerId) {
  const collection = await dbService.getCollection('Customers')
  await collection.deleteOne({ _id: new ObjectId(customerId) })
}
