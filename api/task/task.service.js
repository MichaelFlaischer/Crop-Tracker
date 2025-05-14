import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('tasks')
  return await collection.find().toArray()
}

export async function getById(taskId) {
  const collection = await getCollection('tasks')
  return await collection.findOne({ _id: new ObjectId(taskId) })
}

export async function add(task) {
  const collection = await getCollection('tasks')
  const res = await collection.insertOne(task)
  return { ...task, _id: res.insertedId }
}

export async function update(taskId, task) {
  const collection = await getCollection('tasks')
  delete task._id
  await collection.updateOne({ _id: new ObjectId(taskId) }, { $set: task })
  return { ...task, _id: new ObjectId(taskId) }
}

export async function remove(taskId) {
  const collection = await getCollection('tasks')
  await collection.deleteOne({ _id: new ObjectId(taskId) })
}
