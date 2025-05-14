import { getCollection } from '../../db.service.js'
import { ObjectId } from 'mongodb'

export async function query() {
  const collection = await getCollection('weighingReports')
  return await collection.find().toArray()
}

export async function getById(reportId) {
  const collection = await getCollection('weighingReports')
  return await collection.findOne({ _id: new ObjectId(reportId) })
}

export async function add(report) {
  const collection = await getCollection('weighingReports')
  const res = await collection.insertOne(report)
  return { ...report, _id: res.insertedId }
}

export async function update(reportId, report) {
  const collection = await getCollection('weighingReports')
  delete report._id
  await collection.updateOne({ _id: new ObjectId(reportId) }, { $set: report })
  return { ...report, _id: new ObjectId(reportId) }
}

export async function remove(reportId) {
  const collection = await getCollection('weighingReports')
  await collection.deleteOne({ _id: new ObjectId(reportId) })
}
