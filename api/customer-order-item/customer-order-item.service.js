import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const ITEM_COLLECTION = 'CustomerOrderItems'
const ORDER_COLLECTION = 'CustomerOrders'

function toMongoId(id) {
  if (typeof id === 'number') return id
  if (!isNaN(id) && /^\d+$/.test(id)) return +id
  try {
    return new ObjectId(id)
  } catch {
    throw new Error('Invalid ID format')
  }
}

export async function queryOrderItems() {
  const collection = await dbService.getCollection(ITEM_COLLECTION)
  return await collection.find().toArray()
}

export async function getOrderItemById(itemId) {
  const collection = await dbService.getCollection(ITEM_COLLECTION)
  return await collection.findOne({ _id: toMongoId(itemId) })
}

export async function getOrderItemsByOrderId(orderId) {
  const collection = await dbService.getCollection(ITEM_COLLECTION)

  const idAsMongo = toMongoId(orderId)
  const idAsString = String(orderId)
  const idAsNumber = !isNaN(orderId) ? +orderId : null

  const query = {
    customerOrderId: {
      $in: [idAsMongo, idAsString, idAsNumber].filter(Boolean),
    },
  }

  return await collection.find(query).toArray()
}

export async function getOrderItemsByCropAndStatus(cropId, status) {
  const orderCollection = await dbService.getCollection(ORDER_COLLECTION)
  const itemCollection = await dbService.getCollection(ITEM_COLLECTION)

  const orders = await orderCollection.find({ status }).project({ _id: 1 }).toArray()
  const orderIds = orders.map((o) => o._id)

  return await itemCollection
    .find({
      cropId: toMongoId(cropId),
      customerOrderId: { $in: orderIds },
    })
    .toArray()
}

export async function addOrderItem(item) {
  const collection = await dbService.getCollection(ITEM_COLLECTION)
  const res = await collection.insertOne(item)
  return { ...item, _id: res.insertedId }
}

export async function updateOrderItem(itemId, item) {
  const collection = await dbService.getCollection(ITEM_COLLECTION)
  delete item._id
  await collection.updateOne({ _id: toMongoId(itemId) }, { $set: item })
  return { ...item, _id: toMongoId(itemId) }
}

export async function removeOrderItem(itemId) {
  const collection = await dbService.getCollection(ITEM_COLLECTION)
  await collection.deleteOne({ _id: toMongoId(itemId) })
}

export async function removeByOrderId(orderId) {
  const collection = await dbService.getCollection(ITEM_COLLECTION)
  const key = toMongoId(orderId)
  await collection.deleteMany({ customerOrderId: { $in: [key, String(key)] } })
}
