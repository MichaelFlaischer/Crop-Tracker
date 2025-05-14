import { query, getById, add, update, remove } from './employees-in-tasks.service.js'

export async function getEmployeesInTasks(req, res) {
  try {
    const data = await query()
    res.json(data)
  } catch (err) {
    console.error('Failed to get employees in tasks', err)
    res.status(500).send('Failed to get data')
  }
}

export async function getEmployeeInTaskById(req, res) {
  try {
    const item = await getById(req.params.id)
    res.json(item)
  } catch (err) {
    console.error('Failed to get item by ID', err)
    res.status(500).send('Failed to get item')
  }
}

export async function addEmployeeInTask(req, res) {
  try {
    const item = await add(req.body)
    res.json(item)
  } catch (err) {
    console.error('Failed to add item', err)
    res.status(500).send('Failed to add item')
  }
}

export async function updateEmployeeInTask(req, res) {
  try {
    const item = await update(req.params.id, req.body)
    res.json(item)
  } catch (err) {
    console.error('Failed to update item', err)
    res.status(500).send('Failed to update item')
  }
}

export async function deleteEmployeeInTask(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete item', err)
    res.status(500).send('Failed to delete item')
  }
}
