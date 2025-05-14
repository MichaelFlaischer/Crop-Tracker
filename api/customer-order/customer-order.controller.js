import { query, getById, add, update, remove } from './customer-order.service.js'

export async function getCustomerOrders(req, res) {
  try {
    const orders = await query()
    res.json(orders)
  } catch (err) {
    console.error('Failed to get customer orders', err)
    res.status(500).send('Failed to get orders')
  }
}

export async function getCustomerOrderById(req, res) {
  try {
    const order = await getById(req.params.id)
    res.json(order)
  } catch (err) {
    console.error('Failed to get order by ID', err)
    res.status(500).send('Failed to get order')
  }
}

export async function addCustomerOrder(req, res) {
  try {
    const order = await add(req.body)
    res.json(order)
  } catch (err) {
    console.error('Failed to add order', err)
    res.status(500).send('Failed to add order')
  }
}

export async function updateCustomerOrder(req, res) {
  try {
    const order = await update(req.params.id, req.body)
    res.json(order)
  } catch (err) {
    console.error('Failed to update order', err)
    res.status(500).send('Failed to update order')
  }
}

export async function deleteCustomerOrder(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete order', err)
    res.status(500).send('Failed to delete order')
  }
}
