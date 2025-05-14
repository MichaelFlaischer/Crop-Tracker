import { query, getById, add, update, remove } from './items-allowed-in-warehouse.service.js'

export async function getItemsAllowedInWarehouse(req, res) {
  try {
    const items = await query()
    res.json(items)
  } catch (err) {
    console.error('Failed to get allowed items', err)
    res.status(500).send('Failed to get allowed items')
  }
}

export async function getItemAllowedById(req, res) {
  try {
    const item = await getById(req.params.id)
    res.json(item)
  } catch (err) {
    console.error('Failed to get allowed item by ID', err)
    res.status(500).send('Failed to get allowed item')
  }
}

export async function addItemAllowed(req, res) {
  try {
    const item = await add(req.body)
    res.json(item)
  } catch (err) {
    console.error('Failed to add allowed item', err)
    res.status(500).send('Failed to add allowed item')
  }
}

export async function updateItemAllowed(req, res) {
  try {
    const item = await update(req.params.id, req.body)
    res.json(item)
  } catch (err) {
    console.error('Failed to update allowed item', err)
    res.status(500).send('Failed to update allowed item')
  }
}

export async function deleteItemAllowed(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete allowed item', err)
    res.status(500).send('Failed to delete allowed item')
  }
}
