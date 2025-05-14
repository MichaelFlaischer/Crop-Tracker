import { query, getById, add, update, remove } from './field.service.js'

export async function getFields(req, res) {
  try {
    const fields = await query()
    res.json(fields)
  } catch (err) {
    console.error('Failed to get fields', err)
    res.status(500).send('Failed to get fields')
  }
}

export async function getFieldById(req, res) {
  try {
    const field = await getById(req.params.id)
    res.json(field)
  } catch (err) {
    console.error('Failed to get field by ID', err)
    res.status(500).send('Failed to get field')
  }
}

export async function addField(req, res) {
  try {
    const field = await add(req.body)
    res.json(field)
  } catch (err) {
    console.error('Failed to add field', err)
    res.status(500).send('Failed to add field')
  }
}

export async function updateField(req, res) {
  try {
    const field = await update(req.params.id, req.body)
    res.json(field)
  } catch (err) {
    console.error('Failed to update field', err)
    res.status(500).send('Failed to update field')
  }
}

export async function deleteField(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete field', err)
    res.status(500).send('Failed to delete field')
  }
}
