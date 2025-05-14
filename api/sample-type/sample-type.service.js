import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('sampleTypes')
  return await collection.find().toArray()
}

export async function getById(sampleTypeId) {
  const collection = await getCollection('sampleTypes')
  return await collection.findOne({ _id: new ObjectId(sampleTypeId) })
}

export async function add(sampleType) {
  const collection = await getCollection('sampleTypes')
  const res = await collection.insertOne(sampleType)
  return { ...sampleType, _id: res.insertedId }
}

export async function update(sampleTypeId, sampleType) {
  const collection = await getCollection('sampleTypes')
  delete sampleType._id
  await collection.updateOne({ _id: new ObjectId(sampleTypeId) }, { $set: sampleType })
  return { ...sampleType, _id: new ObjectId(sampleTypeId) }
}

export async function remove(sampleTypeId) {
  const collection = await getCollection('sampleTypes')
  await collection.deleteOne({ _id: new ObjectId(sampleTypeId) })
}
