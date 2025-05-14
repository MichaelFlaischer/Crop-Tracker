import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await dbService.getCollection('InventoryAlerts')
  return await collection.find().toArray()
}

export async function getById(alertId) {
  const collection = await dbService.getCollection('InventoryAlerts')
  return await collection.findOne({ _id: new ObjectId(alertId) })
}

export async function add(alert) {
  const collection = await dbService.getCollection('InventoryAlerts')
  const res = await collection.insertOne(alert)
  return { ...alert, _id: res.insertedId }
}

export async function update(alertId, alert) {
  const collection = await dbService.getCollection('InventoryAlerts')
  delete alert._id
  await collection.updateOne({ _id: new ObjectId(alertId) }, { $set: alert })
  return { ...alert, _id: new ObjectId(alertId) }
}

export async function remove(alertId) {
  const collection = await dbService.getCollection('InventoryAlerts')
  await collection.deleteOne({ _id: new ObjectId(alertId) })
}
