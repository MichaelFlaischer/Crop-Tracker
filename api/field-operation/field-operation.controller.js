import { query, getById, add, update, remove } from './field-operation.service.js'

export async function getFieldOperations(req, res) {
  try {
    const operations = await query()
    res.json(operations)
  } catch (err) {
    console.error('Failed to get field operations', err)
    res.status(500).send('Failed to get operations')
  }
}

export async function getFieldOperationById(req, res) {
  try {
    const operation = await getById(req.params.id)
    res.json(operation)
  } catch (err) {
    console.error('Failed to get operation by ID', err)
    res.status(500).send('Failed to get operation')
  }
}

export async function addFieldOperation(req, res) {
  try {
    const operation = await add(req.body)
    res.json(operation)
  } catch (err) {
    console.error('Failed to add operation', err)
    res.status(500).send('Failed to add operation')
  }
}

export async function updateFieldOperation(req, res) {
  try {
    const operation = await update(req.params.id, req.body)
    res.json(operation)
  } catch (err) {
    console.error('Failed to update operation', err)
    res.status(500).send('Failed to update operation')
  }
}

export async function deleteFieldOperation(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete operation', err)
    res.status(500).send('Failed to delete operation')
  }
}
