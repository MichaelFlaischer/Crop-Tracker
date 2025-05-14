import { query, getById, add, update, remove } from './delivery.service.js'

export async function getDeliveries(req, res) {
  try {
    const deliveries = await query()
    res.json(deliveries)
  } catch (err) {
    console.error('Failed to get deliveries', err)
    res.status(500).send({ error: 'Failed to get deliveries' })
  }
}

export async function getDeliveryById(req, res) {
  try {
    const deliveryId = req.params.id
    const delivery = await getById(deliveryId)
    res.json(delivery)
  } catch (err) {
    console.error(`Failed to get delivery ${req.params.id}`, err)
    res.status(500).send({ error: 'Failed to get delivery' })
  }
}

export async function addDelivery(req, res) {
  try {
    const delivery = req.body
    const savedDelivery = await add(delivery)
    res.json(savedDelivery)
  } catch (err) {
    console.error('Failed to add delivery', err)
    res.status(500).send({ error: 'Failed to add delivery' })
  }
}

export async function updateDelivery(req, res) {
  try {
    const deliveryId = req.params.id
    const delivery = req.body
    const updatedDelivery = await update(deliveryId, delivery)
    res.json(updatedDelivery)
  } catch (err) {
    console.error(`Failed to update delivery ${req.params.id}`, err)
    res.status(500).send({ error: 'Failed to update delivery' })
  }
}

export async function removeDelivery(req, res) {
  try {
    const deliveryId = req.params.id
    await remove(deliveryId)
    res.send({ msg: 'Delivery removed successfully' })
  } catch (err) {
    console.error(`Failed to remove delivery ${req.params.id}`, err)
    res.status(500).send({ error: 'Failed to remove delivery' })
  }
}
