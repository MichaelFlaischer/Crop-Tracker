import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('trucks')
  return await collection.find().toArray()
}

export async function getById(truckId) {
  const collection = await getCollection('trucks')
  return await collection.findOne({ _id: new ObjectId(truckId) })
}

export async function add(truck) {
  const collection = await getCollection('trucks')
  const res = await collection.insertOne(truck)
  return { ...truck, _id: res.insertedId }
}

export async function update(truckId, truck) {
  const collection = await getCollection('trucks')
  delete truck._id
  await collection.updateOne({ _id: new ObjectId(truckId) }, { $set: truck })
  return { ...truck, _id: new ObjectId(truckId) }
}

export async function remove(truckId) {
  const collection = await getCollection('trucks')
  await collection.deleteOne({ _id: new ObjectId(truckId) })
}
