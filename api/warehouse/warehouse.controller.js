import { query, getById, add, update, remove } from './warehouse.service.js'

export async function getWarehouses(req, res) {
  try {
    const warehouses = await query()
    res.json(warehouses)
  } catch (err) {
    console.error('Failed to get warehouses', err)
    res.status(500).send('Failed to get warehouses')
  }
}

export async function getWarehouseById(req, res) {
  try {
    const warehouse = await getById(req.params.id)
    res.json(warehouse)
  } catch (err) {
    console.error('Failed to get warehouse by ID', err)
    res.status(500).send('Failed to get warehouse')
  }
}

export async function addWarehouse(req, res) {
  try {
    const warehouse = await add(req.body)
    res.json(warehouse)
  } catch (err) {
    console.error('Failed to add warehouse', err)
    res.status(500).send('Failed to add warehouse')
  }
}

export async function updateWarehouse(req, res) {
  try {
    const warehouse = await update(req.params.id, req.body)
    res.json(warehouse)
  } catch (err) {
    console.error('Failed to update warehouse', err)
    res.status(500).send('Failed to update warehouse')
  }
}

export async function deleteWarehouse(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete warehouse', err)
    res.status(500).send('Failed to delete warehouse')
  }
}
