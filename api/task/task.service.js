import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('Tasks')
  return await collection.find().toArray()
}

export async function getById(taskId) {
  const collection = await dbService.getCollection('Tasks')
  return await collection.findOne({ _id: new ObjectId(taskId) })
}

export async function add(task) {
  const collection = await dbService.getCollection('Tasks')
  const res = await collection.insertOne(task)
  return { ...task, _id: res.insertedId }
}

export async function update(taskId, task) {
  const collection = await dbService.getCollection('Tasks')
  delete task._id
  await collection.updateOne({ _id: new ObjectId(taskId) }, { $set: task })
  return { ...task, _id: new ObjectId(taskId) }
}

export async function remove(taskId) {
  const collection = await dbService.getCollection('Tasks')
  await collection.deleteOne({ _id: new ObjectId(taskId) })
}
