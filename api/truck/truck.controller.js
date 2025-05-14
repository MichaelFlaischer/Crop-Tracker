import { query, getById, add, update, remove } from './truck.service.js'

export async function getTrucks(req, res) {
  try {
    const trucks = await query()
    res.json(trucks)
  } catch (err) {
    console.error('Failed to get trucks', err)
    res.status(500).send('Failed to get trucks')
  }
}

export async function getTruckById(req, res) {
  try {
    const truck = await getById(req.params.id)
    res.json(truck)
  } catch (err) {
    console.error('Failed to get truck by ID', err)
    res.status(500).send('Failed to get truck')
  }
}

export async function addTruck(req, res) {
  try {
    const truck = await add(req.body)
    res.json(truck)
  } catch (err) {
    console.error('Failed to add truck', err)
    res.status(500).send('Failed to add truck')
  }
}

export async function updateTruck(req, res) {
  try {
    const truck = await update(req.params.id, req.body)
    res.json(truck)
  } catch (err) {
    console.error('Failed to update truck', err)
    res.status(500).send('Failed to update truck')
  }
}

export async function deleteTruck(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete truck', err)
    res.status(500).send('Failed to delete truck')
  }
}
