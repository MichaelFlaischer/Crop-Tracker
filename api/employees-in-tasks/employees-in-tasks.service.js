import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const COLLECTION_NAME = 'EmployeesInTasks'

export async function query() {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.find().toArray()
}

export async function getById(id) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.findOne({ _id: toMongoId(id) })
}

export async function add(item) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const newItem = {
    ...item,
    taskId: toMongoId(item.taskId),
    employeeId: toMongoId(item.employeeId),
    assignedAt: item.assignedAt ? new Date(item.assignedAt) : new Date(),
    actualStart: item.actualStart ? new Date(item.actualStart) : null,
    actualEnd: item.actualEnd ? new Date(item.actualEnd) : null,
  }
  const res = await collection.insertOne(newItem)
  return { ...newItem, _id: res.insertedId }
}

export async function update(id, item) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  delete item._id

  const updatedItem = {
    ...item,
    taskId: toMongoId(item.taskId),
    employeeId: toMongoId(item.employeeId),
  }
  if (item.actualStart) updatedItem.actualStart = new Date(item.actualStart)
  if (item.actualEnd) updatedItem.actualEnd = new Date(item.actualEnd)

  const _id = toMongoId(id)
  await collection.updateOne({ _id }, { $set: updatedItem })
  return { ...updatedItem, _id }
}

export async function remove(id) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  await collection.deleteOne({ _id: toMongoId(id) })
}

function toMongoId(id) {
  if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
    return new ObjectId(id)
  }
  return id
}
