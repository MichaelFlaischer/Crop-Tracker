import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const COLLECTION_NAME = 'Tasks'

export async function query() {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.find().toArray()
}

export async function getById(taskId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const id = toMongoId(taskId)
  return await collection.findOne({ _id: id })
}

export async function add(task) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const taskToAdd = {
    ...task,
    fieldId: toMongoId(task.fieldId),
    operationId: toMongoId(task.operationId),
    startDate: new Date(task.startDate),
    endDate: new Date(task.endDate),
  }
  const res = await collection.insertOne(taskToAdd)
  return { ...taskToAdd, _id: res.insertedId }
}

export async function update(taskId, task) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const id = toMongoId(taskId)
  const taskToSave = {
    ...task,
    fieldId: toMongoId(task.fieldId),
    operationId: toMongoId(task.operationId),
    startDate: new Date(task.startDate),
    endDate: new Date(task.endDate),
  }
  delete taskToSave._id
  await collection.updateOne({ _id: id }, { $set: taskToSave })
  return { ...taskToSave, _id: id }
}

export async function remove(taskId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const id = toMongoId(taskId)
  await collection.deleteOne({ _id: id })
}

function toMongoId(id) {
  try {
    return new ObjectId(id)
  } catch {
    throw new Error('Invalid ObjectId format')
  }
}
