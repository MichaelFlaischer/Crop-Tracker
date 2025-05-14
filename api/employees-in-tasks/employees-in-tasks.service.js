import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('EmployeesInTasks')
  return await collection.find().toArray()
}

export async function getById(id) {
  const collection = await dbService.getCollection('EmployeesInTasks')
  return await collection.findOne({ _id: new ObjectId(id) })
}

export async function add(item) {
  const collection = await dbService.getCollection('EmployeesInTasks')
  const res = await collection.insertOne(item)
  return { ...item, _id: res.insertedId }
}

export async function update(id, item) {
  const collection = await dbService.getCollection('EmployeesInTasks')
  delete item._id
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: item })
  return { ...item, _id: new ObjectId(id) }
}

export async function remove(id) {
  const collection = await dbService.getCollection('EmployeesInTasks')
  await collection.deleteOne({ _id: new ObjectId(id) })
}
