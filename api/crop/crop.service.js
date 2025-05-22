import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('Crops')
  return await collection.find().toArray()
}

export async function getById(cropId) {
  const collection = await dbService.getCollection('Crops')
  const id = toMongoId(cropId)
  return await collection.findOne({ _id: id })
}

export async function add(crop) {
  const collection = await dbService.getCollection('Crops')
  const res = await collection.insertOne(crop)
  return { ...crop, _id: res.insertedId }
}

export async function update(cropId, crop) {
  const collection = await dbService.getCollection('Crops')
  const id = toMongoId(cropId)
  delete crop._id
  await collection.updateOne({ _id: id }, { $set: crop })
  return { ...crop, _id: id }
}

export async function remove(cropId) {
  const collection = await dbService.getCollection('Crops')
  const id = toMongoId(cropId)
  await collection.deleteOne({ _id: id })
}

function toMongoId(id) {
  if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) {
    return new ObjectId(id)
  }

  const num = Number(id)
  if (!isNaN(num)) return num

  return id
}
