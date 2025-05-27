import { query, getById, add, update, remove, getWarehousesByCropId, updateCropQuantity } from './warehouse.service.js'

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

export async function getWarehousesByCrop(req, res) {
  try {
    const cropId = req.params.cropId
    const results = await getWarehousesByCropId(cropId)
    res.json(results)
  } catch (err) {
    console.error(`Failed to get warehouses by crop ID ${req.params.cropId}:`, err)
    res.status(500).send('Failed to get warehouses by crop ID')
  }
}

export async function updateWarehouseCropQuantity(req, res) {
  try {
    const { warehouseId, cropId, diff } = req.body
    if (!warehouseId || !cropId || typeof diff !== 'number') {
      return res.status(400).send('Missing or invalid parameters')
    }

    await updateCropQuantity(warehouseId, cropId, diff)
    res.status(200).send('Crop quantity updated successfully')
  } catch (err) {
    console.error('Failed to update crop quantity:', err)
    res.status(500).send('Failed to update crop quantity')
  }
}
