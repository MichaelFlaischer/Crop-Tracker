import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('SampleTypes')
  return await collection.find().toArray()
}

export async function getById(sampleTypeId) {
  const collection = await dbService.getCollection('SampleTypes')
  return await collection.findOne({ _id: new ObjectId(sampleTypeId) })
}

export async function add(sampleType) {
  const collection = await dbService.getCollection('SampleTypes')
  const res = await collection.insertOne(sampleType)
  return { ...sampleType, _id: res.insertedId }
}

export async function update(sampleTypeId, sampleType) {
  const collection = await dbService.getCollection('SampleTypes')
  delete sampleType._id
  await collection.updateOne({ _id: new ObjectId(sampleTypeId) }, { $set: sampleType })
  return { ...sampleType, _id: new ObjectId(sampleTypeId) }
}

export async function remove(sampleTypeId) {
  const collection = await dbService.getCollection('SampleTypes')
  await collection.deleteOne({ _id: new ObjectId(sampleTypeId) })
}
