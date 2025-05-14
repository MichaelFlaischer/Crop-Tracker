import { query, getById, add, update, remove } from './customer-order-item.service.js'

export async function getCustomerOrderItems(req, res) {
  try {
    const items = await query()
    res.json(items)
  } catch (err) {
    console.error('Failed to get customer order items', err)
    res.status(500).send('Failed to get items')
  }
}

export async function getCustomerOrderItemById(req, res) {
  try {
    const item = await getById(req.params.id)
    res.json(item)
  } catch (err) {
    console.error('Failed to get item by ID', err)
    res.status(500).send('Failed to get item')
  }
}

export async function addCustomerOrderItem(req, res) {
  try {
    const item = await add(req.body)
    res.json(item)
  } catch (err) {
    console.error('Failed to add item', err)
    res.status(500).send('Failed to add item')
  }
}

export async function updateCustomerOrderItem(req, res) {
  try {
    const item = await update(req.params.id, req.body)
    res.json(item)
  } catch (err) {
    console.error('Failed to update item', err)
    res.status(500).send('Failed to update item')
  }
}

export async function deleteCustomerOrderItem(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete item', err)
    res.status(500).send('Failed to delete item')
  }
}
