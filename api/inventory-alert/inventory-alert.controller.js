import { query, getById, add, update, remove } from './inventory-alert.service.js'

export async function getInventoryAlerts(req, res) {
  try {
    const alerts = await query()
    res.json(alerts)
  } catch (err) {
    console.error('Failed to get inventory alerts', err)
    res.status(500).send('Failed to get alerts')
  }
}

export async function getInventoryAlertById(req, res) {
  try {
    const alert = await getById(req.params.id)
    res.json(alert)
  } catch (err) {
    console.error('Failed to get alert by ID', err)
    res.status(500).send('Failed to get alert')
  }
}

export async function addInventoryAlert(req, res) {
  try {
    const alert = await add(req.body)
    res.json(alert)
  } catch (err) {
    console.error('Failed to add alert', err)
    res.status(500).send('Failed to add alert')
  }
}

export async function updateInventoryAlert(req, res) {
  try {
    const alert = await update(req.params.id, req.body)
    res.json(alert)
  } catch (err) {
    console.error('Failed to update alert', err)
    res.status(500).send('Failed to update alert')
  }
}

export async function deleteInventoryAlert(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete alert', err)
    res.status(500).send('Failed to delete alert')
  }
}
