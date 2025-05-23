import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const COLLECTION_NAME = 'SowingAndHarvest'

export async function query() {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.find().toArray()
}

export async function getById(id) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const pipeline = [
    {
      $match: isValidObjectId(id) ? { _id: new ObjectId(id) } : { _id: id },
    },
    {
      $lookup: {
        from: 'Field',
        localField: 'fieldId',
        foreignField: '_id',
        as: 'fieldInfo',
      },
    },
    {
      $unwind: {
        path: '$fieldInfo',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: 'Crop',
        localField: 'cropId',
        foreignField: '_id',
        as: 'cropInfo',
      },
    },
    {
      $unwind: {
        path: '$cropInfo',
        preserveNullAndEmptyArrays: true,
      },
    },
  ]

  const results = await collection.aggregate(pipeline).toArray()
  return results[0] || null
}

export async function add(data) {
  const collection = await dbService.getCollection(COLLECTION_NAME)

  const newRecord = {
    fieldId: isValidObjectId(data.fieldId) ? new ObjectId(data.fieldId) : data.fieldId,
    cropId: isValidObjectId(data.cropId) ? new ObjectId(data.cropId) : data.cropId,
    sowingDate: new Date(data.sowingDate),
    harvestDate: data.harvestDate ? new Date(data.harvestDate) : null,
    isActive: true,
    harvestLogs: [],
    notes: data.notes || '',
  }

  const res = await collection.insertOne(newRecord)
  return { ...newRecord, _id: res.insertedId }
}

export async function update(id, data) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  delete data._id

  if (data.fieldId && isValidObjectId(data.fieldId)) data.fieldId = new ObjectId(data.fieldId)
  if (data.cropId && isValidObjectId(data.cropId)) data.cropId = new ObjectId(data.cropId)
  if (data.sowingDate) data.sowingDate = new Date(data.sowingDate)
  if (data.harvestDate) data.harvestDate = new Date(data.harvestDate)

  const filter = isValidObjectId(id) ? { _id: new ObjectId(id) } : { _id: id }
  await collection.updateOne(filter, { $set: data })
  return { ...data, _id: id }
}

export async function remove(id) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const filter = isValidObjectId(id) ? { _id: new ObjectId(id) } : { _id: id }
  await collection.deleteOne(filter)
}

export async function addHarvestLog(id, log) {
  const collection = await dbService.getCollection(COLLECTION_NAME)

  const harvestLogEntry = {
    date: new Date(log.date),
    amount: log.amount,
    notes: log.notes || '',
  }

  const filter = isValidObjectId(id) ? { _id: new ObjectId(id) } : { _id: id }

  const updateOps = {
    $push: { harvestLogs: harvestLogEntry },
  }

  if (log.completeHarvest) {
    updateOps.$set = {
      isActive: false,
      harvestDate: new Date(log.date),
    }
  }

  const res = await collection.findOneAndUpdate(filter, updateOps, { returnDocument: 'after' })

  return res.value
}

function isValidObjectId(id) {
  return typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)
}
