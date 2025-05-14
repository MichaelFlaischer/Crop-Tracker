import { query, getById, add, update, remove } from './customer.service.js'

export async function getCustomers(req, res) {
  try {
    const customers = await query()
    res.json(customers)
  } catch (err) {
    console.error('Failed to get customers', err)
    res.status(500).send('Failed to get customers')
  }
}

export async function getCustomerById(req, res) {
  try {
    const customer = await getById(req.params.id)
    res.json(customer)
  } catch (err) {
    console.error('Failed to get customer by ID', err)
    res.status(500).send('Failed to get customer')
  }
}

export async function addCustomer(req, res) {
  try {
    const customer = await add(req.body)
    res.json(customer)
  } catch (err) {
    console.error('Failed to add customer', err)
    res.status(500).send('Failed to add customer')
  }
}

export async function updateCustomer(req, res) {
  try {
    const customer = await update(req.params.id, req.body)
    res.json(customer)
  } catch (err) {
    console.error('Failed to update customer', err)
    res.status(500).send('Failed to update customer')
  }
}

export async function deleteCustomer(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete customer', err)
    res.status(500).send('Failed to delete customer')
  }
}
