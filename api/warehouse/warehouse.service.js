import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('warehouses')
  return await collection.find().toArray()
}

export async function getById(warehouseId) {
  const collection = await getCollection('warehouses')
  return await collection.findOne({ _id: new ObjectId(warehouseId) })
}

export async function add(warehouse) {
  const collection = await getCollection('warehouses')
  const res = await collection.insertOne(warehouse)
  return { ...warehouse, _id: res.insertedId }
}

export async function update(warehouseId, warehouse) {
  const collection = await getCollection('warehouses')
  delete warehouse._id
  await collection.updateOne({ _id: new ObjectId(warehouseId) }, { $set: warehouse })
  return { ...warehouse, _id: new ObjectId(warehouseId) }
}

export async function remove(warehouseId) {
  const collection = await getCollection('warehouses')
  await collection.deleteOne({ _id: new ObjectId(warehouseId) })
}
