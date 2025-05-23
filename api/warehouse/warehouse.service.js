import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('Warehouses')
  return await collection.find().toArray()
}

export async function add(warehouse) {
  const collection = await dbService.getCollection('Warehouses')
  const res = await collection.insertOne(warehouse)
  return { ...warehouse, _id: res.insertedId }
}

export async function getById(warehouseId) {
  const collection = await dbService.getCollection('Warehouses')
  const id = toMongoId(warehouseId)
  return await collection.findOne({ _id: id })
}

export async function update(warehouseId, warehouse) {
  const collection = await dbService.getCollection('Warehouses')
  delete warehouse._id
  const id = toMongoId(warehouseId)
  await collection.updateOne({ _id: id }, { $set: warehouse })
  return { ...warehouse, _id: id }
}

export async function remove(warehouseId) {
  const collection = await dbService.getCollection('Warehouses')
  const id = toMongoId(warehouseId)
  await collection.deleteOne({ _id: id })
}

function toMongoId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : id
}
