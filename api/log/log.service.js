import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('logs')
  return await collection.find().toArray()
}

export async function getById(logId) {
  const collection = await getCollection('logs')
  return await collection.findOne({ _id: new ObjectId(logId) })
}

export async function add(log) {
  const collection = await getCollection('logs')
  const res = await collection.insertOne(log)
  return { ...log, _id: res.insertedId }
}

export async function update(logId, log) {
  const collection = await getCollection('logs')
  delete log._id
  await collection.updateOne({ _id: new ObjectId(logId) }, { $set: log })
  return { ...log, _id: new ObjectId(logId) }
}

export async function remove(logId) {
  const collection = await getCollection('logs')
  await collection.deleteOne({ _id: new ObjectId(logId) })
}
