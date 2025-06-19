import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

const ITEM_COLLECTION = 'CustomerOrderItems'
const ORDER_COLLECTION = 'CustomerOrders'

function toMongoId(id) {
  if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
    return new ObjectId(id)
  }
  return id
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
  return await collection.find({ customerOrderId: toMongoId(orderId) }).toArray()
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
  const newItem = {
    ...item,
    customerOrderId: toMongoId(item.customerOrderId),
    cropId: toMongoId(item.cropId),
    quantity: Number(item.quantity),
    price: Number(item.price) || 0,
    deliveredQuantity: Number(item.deliveredQuantity) || 0,
    warehouseBreakdown: (item.warehouseBreakdown || []).map((w) => {
      if (!w.warehouseId || typeof w.quantity !== 'number') {
        throw new Error('Invalid warehouse breakdown entry')
      }
      return {
        warehouseId: toMongoId(w.warehouseId),
        quantity: Number(w.quantity),
      }
    }),
  }

  const collection = await dbService.getCollection(ITEM_COLLECTION)
  const res = await collection.insertOne(newItem)
  return { ...newItem, _id: res.insertedId }
}

export async function updateOrderItem(itemId, item) {
  const updatedItem = {
    ...item,
    customerOrderId: toMongoId(item.customerOrderId),
    cropId: toMongoId(item.cropId),
    quantity: Number(item.quantity),
    price: Number(item.price) || 0,
    deliveredQuantity: Number(item.deliveredQuantity) || 0,
    warehouseBreakdown: (item.warehouseBreakdown || []).map((w) => {
      if (!w.warehouseId || typeof w.quantity !== 'number') {
        throw new Error('Invalid warehouse breakdown entry')
      }
      return {
        warehouseId: toMongoId(w.warehouseId),
        quantity: Number(w.quantity),
      }
    }),
  }

  const collection = await dbService.getCollection(ITEM_COLLECTION)
  await collection.updateOne({ _id: toMongoId(itemId) }, { $set: updatedItem })
  return { ...updatedItem, _id: toMongoId(itemId) }
}

export async function removeOrderItem(itemId) {
  const collection = await dbService.getCollection(ITEM_COLLECTION)
  await collection.deleteOne({ _id: toMongoId(itemId) })
}

export async function removeByOrderId(orderId) {
  const collection = await dbService.getCollection(ITEM_COLLECTION)
  const key = toMongoId(orderId)
  await collection.deleteMany({ customerOrderId: key })
}
