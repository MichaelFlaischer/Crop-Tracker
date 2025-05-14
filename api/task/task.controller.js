import { query, getById, add, update, remove } from './task.service.js'

export async function getTasks(req, res) {
  try {
    const tasks = await query()
    res.json(tasks)
  } catch (err) {
    console.error('Failed to get tasks', err)
    res.status(500).send('Failed to get tasks')
  }
}

export async function getTaskById(req, res) {
  try {
    const task = await getById(req.params.id)
    res.json(task)
  } catch (err) {
    console.error('Failed to get task by ID', err)
    res.status(500).send('Failed to get task')
  }
}

export async function addTask(req, res) {
  try {
    const task = await add(req.body)
    res.json(task)
  } catch (err) {
    console.error('Failed to add task', err)
    res.status(500).send('Failed to add task')
  }
}

export async function updateTask(req, res) {
  try {
    const task = await update(req.params.id, req.body)
    res.json(task)
  } catch (err) {
    console.error('Failed to update task', err)
    res.status(500).send('Failed to update task')
  }
}

export async function deleteTask(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete task', err)
    res.status(500).send('Failed to delete task')
  }
}
