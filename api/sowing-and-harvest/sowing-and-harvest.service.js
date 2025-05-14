import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('SowingAndHarvest')
  return await collection.find().toArray()
}

export async function getById(id) {
  const collection = await dbService.getCollection('SowingAndHarvest')
  return await collection.findOne({ _id: new ObjectId(id) })
}

export async function add(data) {
  const collection = await dbService.getCollection('SowingAndHarvest')
  const res = await collection.insertOne(data)
  return { ...data, _id: res.insertedId }
}

export async function update(id, data) {
  const collection = await dbService.getCollection('SowingAndHarvest')
  delete data._id
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
  return { ...data, _id: new ObjectId(id) }
}

export async function remove(id) {
  const collection = await dbService.getCollection('SowingAndHarvest')
  await collection.deleteOne({ _id: new ObjectId(id) })
}
