import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const COLLECTION_NAME = 'Warehouses'

export async function query() {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  return await collection.find().toArray()
}

export async function add(warehouse) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const res = await collection.insertOne(warehouse)
  return { ...warehouse, _id: res.insertedId }
}

export async function getById(warehouseId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const id = toMongoId(warehouseId)
  return await collection.findOne({ _id: id })
}

export async function update(warehouseId, warehouse) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  delete warehouse._id
  const id = toMongoId(warehouseId)
  await collection.updateOne({ _id: id }, { $set: warehouse })
  return { ...warehouse, _id: id }
}

export async function remove(warehouseId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const id = toMongoId(warehouseId)
  await collection.deleteOne({ _id: id })
}

export async function getWarehousesByCropId(cropId) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const cropKey = toMongoId(cropId)

  const warehouses = await collection
    .find({
      $or: [{ 'cropsStock.cropId': cropKey }, { 'cropsStock.cropId': String(cropKey) }],
    })
    .project({
      _id: 1,
      warehouseName: 1,
      cropsStock: 1,
    })
    .toArray()

  return warehouses
    .map((wh) => {
      const item = (wh.cropsStock || []).find((inv) => String(inv.cropId) === String(cropKey))
      if (!item) return null
      return {
        warehouseId: wh._id,
        warehouseName: wh.warehouseName,
        quantity: item.quantity,
      }
    })
    .filter(Boolean)
}

export async function updateCropQuantity(warehouseId, cropId, diff) {
  const collection = await dbService.getCollection(COLLECTION_NAME)
  const id = toMongoId(warehouseId)
  const cropKey = toMongoId(cropId)

  await collection.updateOne({ _id: id, 'cropsStock.cropId': { $in: [cropKey, String(cropKey)] } }, { $inc: { 'cropsStock.$.quantity': diff } })
}

function toMongoId(id) {
  if (typeof id === 'number') return id
  if (!isNaN(id) && /^\d+$/.test(id)) return +id
  try {
    return new ObjectId(id)
  } catch {
    throw new Error('Invalid ID format')
  }
}
