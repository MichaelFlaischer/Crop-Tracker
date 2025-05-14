import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('fields')
  return await collection.find().toArray()
}

export async function getById(fieldId) {
  const collection = await getCollection('fields')
  return await collection.findOne({ _id: new ObjectId(fieldId) })
}

export async function add(field) {
  const collection = await getCollection('fields')
  const res = await collection.insertOne(field)
  return { ...field, _id: res.insertedId }
}

export async function update(fieldId, field) {
  const collection = await getCollection('fields')
  delete field._id
  await collection.updateOne({ _id: new ObjectId(fieldId) }, { $set: field })
  return { ...field, _id: new ObjectId(fieldId) }
}

export async function remove(fieldId) {
  const collection = await getCollection('fields')
  await collection.deleteOne({ _id: new ObjectId(fieldId) })
}
