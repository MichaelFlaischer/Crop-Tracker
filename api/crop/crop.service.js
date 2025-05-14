import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('crops')
  return await collection.find().toArray()
}

export async function getById(cropId) {
  const collection = await getCollection('crops')
  return await collection.findOne({ _id: new ObjectId(cropId) })
}

export async function add(crop) {
  const collection = await getCollection('crops')
  const res = await collection.insertOne(crop)
  return { ...crop, _id: res.insertedId }
}

export async function update(cropId, crop) {
  const collection = await getCollection('crops')
  delete crop._id
  await collection.updateOne({ _id: new ObjectId(cropId) }, { $set: crop })
  return { ...crop, _id: new ObjectId(cropId) }
}

export async function remove(cropId) {
  const collection = await getCollection('crops')
  await collection.deleteOne({ _id: new ObjectId(cropId) })
}
