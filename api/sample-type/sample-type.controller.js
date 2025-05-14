import { query, getById, add, update, remove } from './sample-type.service.js'

export async function getSampleTypes(req, res) {
  try {
    const types = await query()
    res.json(types)
  } catch (err) {
    console.error('Failed to get sample types', err)
    res.status(500).send('Failed to get sample types')
  }
}

export async function getSampleTypeById(req, res) {
  try {
    const type = await getById(req.params.id)
    res.json(type)
  } catch (err) {
    console.error('Failed to get sample type by ID', err)
    res.status(500).send('Failed to get sample type')
  }
}

export async function addSampleType(req, res) {
  try {
    const type = await add(req.body)
    res.json(type)
  } catch (err) {
    console.error('Failed to add sample type', err)
    res.status(500).send('Failed to add sample type')
  }
}

export async function updateSampleType(req, res) {
  try {
    const type = await update(req.params.id, req.body)
    res.json(type)
  } catch (err) {
    console.error('Failed to update sample type', err)
    res.status(500).send('Failed to update sample type')
  }
}

export async function deleteSampleType(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete sample type', err)
    res.status(500).send('Failed to delete sample type')
  }
}
