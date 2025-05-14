import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('customers')
  return await collection.find().toArray()
}

export async function getById(customerId) {
  const collection = await getCollection('customers')
  return await collection.findOne({ _id: new ObjectId(customerId) })
}

export async function add(customer) {
  const collection = await getCollection('customers')
  const res = await collection.insertOne(customer)
  return { ...customer, _id: res.insertedId }
}

export async function update(customerId, customer) {
  const collection = await getCollection('customers')
  delete customer._id
  await collection.updateOne({ _id: new ObjectId(customerId) }, { $set: customer })
  return { ...customer, _id: new ObjectId(customerId) }
}

export async function remove(customerId) {
  const collection = await getCollection('customers')
  await collection.deleteOne({ _id: new ObjectId(customerId) })
}
