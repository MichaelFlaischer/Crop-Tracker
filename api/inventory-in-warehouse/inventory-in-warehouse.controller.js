import { query, getById, add, update, remove } from './inventory-in-warehouse.service.js'

export async function getInventoryInWarehouse(req, res) {
  try {
    const inventory = await query()
    res.json(inventory)
  } catch (err) {
    console.error('Failed to get inventory', err)
    res.status(500).send('Failed to get inventory')
  }
}

export async function getInventoryItemById(req, res) {
  try {
    const item = await getById(req.params.id)
    res.json(item)
  } catch (err) {
    console.error('Failed to get inventory item by ID', err)
    res.status(500).send('Failed to get inventory item')
  }
}

export async function addInventoryItem(req, res) {
  try {
    const item = await add(req.body)
    res.json(item)
  } catch (err) {
    console.error('Failed to add inventory item', err)
    res.status(500).send('Failed to add inventory item')
  }
}

export async function updateInventoryItem(req, res) {
  try {
    const item = await update(req.params.id, req.body)
    res.json(item)
  } catch (err) {
    console.error('Failed to update inventory item', err)
    res.status(500).send('Failed to update inventory item')
  }
}

export async function deleteInventoryItem(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete inventory item', err)
    res.status(500).send('Failed to delete inventory item')
  }
}
