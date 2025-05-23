import { query, getById, add, update, remove, addHarvestLog } from './sowing-and-harvest.service.js'

export async function getSowingAndHarvests(req, res) {
  try {
    const records = await query()
    res.json(records)
  } catch (err) {
    console.error('Failed to get sowing and harvest records', err)
    res.status(500).send('Failed to get data')
  }
}

export async function getSowingAndHarvestById(req, res) {
  try {
    const record = await getById(req.params.id)
    res.json(record)
  } catch (err) {
    console.error('Failed to get record by ID', err)
    res.status(500).send('Failed to get record')
  }
}

export async function addSowingAndHarvest(req, res) {
  try {
    const record = await add(req.body)
    res.json(record)
  } catch (err) {
    console.error('Failed to add record', err)
    res.status(500).send('Failed to add record')
  }
}

export async function updateSowingAndHarvest(req, res) {
  try {
    const record = await update(req.params.id, req.body)
    res.json(record)
  } catch (err) {
    console.error('Failed to update record', err)
    res.status(500).send('Failed to update record')
  }
}

export async function deleteSowingAndHarvest(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete record', err)
    res.status(500).send('Failed to delete record')
  }
}

export async function addHarvestToLog(req, res) {
  try {
    const updatedRecord = await addHarvestLog(req.params.id, req.body)
    res.json(updatedRecord)
  } catch (err) {
    console.error('Failed to add harvest log', err)
    res.status(500).send('Failed to add harvest log')
  }
}
