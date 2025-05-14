import { query, getById, add, update, remove } from './log.service.js'

export async function getLogs(req, res) {
  try {
    const logs = await query()
    res.json(logs)
  } catch (err) {
    console.error('Failed to get logs', err)
    res.status(500).send('Failed to get logs')
  }
}

export async function getLogById(req, res) {
  try {
    const log = await getById(req.params.id)
    res.json(log)
  } catch (err) {
    console.error('Failed to get log by ID', err)
    res.status(500).send('Failed to get log')
  }
}

export async function addLog(req, res) {
  try {
    const log = await add(req.body)
    res.json(log)
  } catch (err) {
    console.error('Failed to add log', err)
    res.status(500).send('Failed to add log')
  }
}

export async function updateLog(req, res) {
  try {
    const log = await update(req.params.id, req.body)
    res.json(log)
  } catch (err) {
    console.error('Failed to update log', err)
    res.status(500).send('Failed to update log')
  }
}

export async function deleteLog(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete log', err)
    res.status(500).send('Failed to delete log')
  }
}
