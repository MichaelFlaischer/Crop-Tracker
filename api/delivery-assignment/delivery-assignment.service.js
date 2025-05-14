import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('DeliveryAssignments')
  return await collection.find().toArray()
}

export async function getById(assignmentId) {
  const collection = await dbService.getCollection('DeliveryAssignments')
  return await collection.findOne({ _id: new ObjectId(assignmentId) })
}

export async function add(assignment) {
  const collection = await dbService.getCollection('DeliveryAssignments')
  const res = await collection.insertOne(assignment)
  return { ...assignment, _id: res.insertedId }
}

export async function update(assignmentId, assignment) {
  const collection = await dbService.getCollection('DeliveryAssignments')
  delete assignment._id
  await collection.updateOne({ _id: new ObjectId(assignmentId) }, { $set: assignment })
  return { ...assignment, _id: new ObjectId(assignmentId) }
}

export async function remove(assignmentId) {
  const collection = await dbService.getCollection('DeliveryAssignments')
  await collection.deleteOne({ _id: new ObjectId(assignmentId) })
}
