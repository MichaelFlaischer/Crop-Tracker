import {
  queryOrderItems,
  getOrderItemById,
  getOrderItemsByOrderId,
  getOrderItemsByCropAndStatus,
  addOrderItem,
  updateOrderItem,
  removeOrderItem,
  removeByOrderId,
} from './customer-order-item.service.js'

export async function getOrderItems(req, res) {
  try {
    const items = await queryOrderItems()
    res.json(items)
  } catch (err) {
    console.error('❌ Failed to get all order items:', err)
    res.status(500).send('Failed to get order items')
  }
}

export async function getOrderItemByIdController(req, res) {
  try {
    const item = await getOrderItemById(req.params.id)
    res.json(item)
  } catch (err) {
    console.error(`❌ Failed to get order item by ID ${req.params.id}:`, err)
    res.status(500).send('Failed to get order item')
  }
}

export async function getItemsByOrderId(req, res) {
  try {
    const items = await getOrderItemsByOrderId(req.params.orderId)
    res.json(items)
  } catch (err) {
    console.error(`❌ Failed to get items by order ID ${req.params.orderId}:`, err)
    res.status(500).send('Failed to get order items by order ID')
  }
}

export async function getItemsByCropAndStatus(req, res) {
  try {
    const { cropId, status } = req.params
    const items = await getOrderItemsByCropAndStatus(cropId, status)
    res.json(items)
  } catch (err) {
    console.error(`❌ Failed to get items for crop ${req.params.cropId} and status ${req.params.status}:`, err)
    res.status(500).send('Failed to get items by crop and status')
  }
}

export async function addOrderItemController(req, res) {
  try {
    const item = await addOrderItem(req.body)
    res.json(item)
  } catch (err) {
    console.error('❌ Failed to add order item:', err)
    res.status(500).send('Failed to add order item')
  }
}

export async function updateOrderItemController(req, res) {
  try {
    const item = await updateOrderItem(req.params.id, req.body)
    res.json(item)
  } catch (err) {
    console.error(`❌ Failed to update order item ID ${req.params.id}:`, err)
    res.status(500).send('Failed to update order item')
  }
}

export async function deleteOrderItemController(req, res) {
  try {
    await removeOrderItem(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error(`❌ Failed to delete order item ID ${req.params.id}:`, err)
    res.status(500).send('Failed to delete order item')
  }
}

export async function removeItemsByOrderId(req, res) {
  try {
    const orderId = req.params.orderId
    await removeByOrderId(orderId)
    res.sendStatus(204)
  } catch (err) {
    console.error('❌ Failed to remove items by orderId:', err)
    res.status(500).send('Failed to remove items by orderId')
  }
}
