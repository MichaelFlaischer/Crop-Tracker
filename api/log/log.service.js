import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('Logs')
  return await collection.find().toArray()
}

export async function getById(logId) {
  const collection = await dbService.getCollection('Logs')
  return await collection.findOne({ _id: new ObjectId(logId) })
}

export async function add(log) {
  const collection = await dbService.getCollection('Logs')
  const res = await collection.insertOne(log)
  return { ...log, _id: res.insertedId }
}

export async function update(logId, log) {
  const collection = await dbService.getCollection('Logs')
  delete log._id
  await collection.updateOne({ _id: new ObjectId(logId) }, { $set: log })
  return { ...log, _id: new ObjectId(logId) }
}

export async function remove(logId) {
  const collection = await dbService.getCollection('Logs')
  await collection.deleteOne({ _id: new ObjectId(logId) })
}
