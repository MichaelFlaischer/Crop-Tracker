import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const COLLECTION_NAME = 'Seasons'

export async function query() {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.find().toArray()
}

export async function getById(seasonId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.findOne({ _id: seasonId })
}

export async function update(seasonId, season) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  delete season._id
  await collection.updateOne({ _id: seasonId }, { $set: season })
  return { ...season, _id: seasonId }
}
