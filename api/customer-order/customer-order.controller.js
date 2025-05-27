import { queryOrders, getOrderById, getOrdersByCustomerId, addOrder, updateOrder, removeOrder } from './customer-order.service.js'

export async function getCustomerOrders(req, res) {
  try {
    const orders = await queryOrders()
    res.json(orders)
  } catch (err) {
    console.error('Failed to get customer orders', err)
    res.status(500).send('Failed to get orders')
  }
}

export async function getCustomerOrderById(req, res) {
  try {
    const order = await getOrderById(req.params.id)
    res.json(order)
  } catch (err) {
    console.error('Failed to get order by ID', err)
    res.status(500).send('Failed to get order')
  }
}

export async function getOrdersByCustomer(req, res) {
  try {
    const orders = await getOrdersByCustomerId(req.params.customerId)
    res.json(orders)
  } catch (err) {
    console.error('Failed to get orders by customer ID', err)
    res.status(500).send('Failed to get customer orders')
  }
}

export async function addCustomerOrder(req, res) {
  try {
    const order = await addOrder(req.body)
    res.json(order)
  } catch (err) {
    console.error('Failed to add order', err)
    res.status(500).send('Failed to add order')
  }
}

export async function updateCustomerOrder(req, res) {
  try {
    const order = await updateOrder(req.params.id, req.body)
    res.json(order)
  } catch (err) {
    console.error('Failed to update order', err)
    res.status(500).send('Failed to update order')
  }
}

export async function deleteCustomerOrder(req, res) {
  try {
    await removeOrder(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete order', err)
    res.status(500).send('Failed to delete order')
  }
}
