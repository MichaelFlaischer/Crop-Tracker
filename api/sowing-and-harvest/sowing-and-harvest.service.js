import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('sowingAndHarvest')
  return await collection.find().toArray()
}

export async function getById(id) {
  const collection = await getCollection('sowingAndHarvest')
  return await collection.findOne({ _id: new ObjectId(id) })
}

export async function add(data) {
  const collection = await getCollection('sowingAndHarvest')
  const res = await collection.insertOne(data)
  return { ...data, _id: res.insertedId }
}

export async function update(id, data) {
  const collection = await getCollection('sowingAndHarvest')
  delete data._id
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
  return { ...data, _id: new ObjectId(id) }
}

export async function remove(id) {
  const collection = await getCollection('sowingAndHarvest')
  await collection.deleteOne({ _id: new ObjectId(id) })
}
