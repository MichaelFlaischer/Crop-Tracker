import { query, getById, add, update, remove } from './crop.service.js'

export async function getCrops(req, res) {
  try {
    const crops = await query()
    res.json(crops)
  } catch (err) {
    console.error('Failed to get crops', err)
    res.status(500).send('Failed to get crops')
  }
}

export async function getCropById(req, res) {
  try {
    const crop = await getById(req.params.id)
    res.json(crop)
  } catch (err) {
    console.error('Failed to get crop by ID', err)
    res.status(500).send('Failed to get crop')
  }
}

export async function addCrop(req, res) {
  try {
    const crop = await add(req.body)
    res.json(crop)
  } catch (err) {
    console.error('Failed to add crop', err)
    res.status(500).send('Failed to add crop')
  }
}

export async function updateCrop(req, res) {
  try {
    const crop = await update(req.params.id, req.body)
    res.json(crop)
  } catch (err) {
    console.error('Failed to update crop', err)
    res.status(500).send('Failed to update crop')
  }
}

export async function deleteCrop(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete crop', err)
    res.status(500).send('Failed to delete crop')
  }
}
