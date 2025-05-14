import { query, getById, add, update, remove } from './delivery-assignment.service.js'

export async function getDeliveryAssignments(req, res) {
  try {
    const assignments = await query()
    res.json(assignments)
  } catch (err) {
    console.error('Failed to get delivery assignments', err)
    res.status(500).send('Failed to get assignments')
  }
}

export async function getDeliveryAssignmentById(req, res) {
  try {
    const assignment = await getById(req.params.id)
    res.json(assignment)
  } catch (err) {
    console.error('Failed to get assignment by ID', err)
    res.status(500).send('Failed to get assignment')
  }
}

export async function addDeliveryAssignment(req, res) {
  try {
    const assignment = await add(req.body)
    res.json(assignment)
  } catch (err) {
    console.error('Failed to add assignment', err)
    res.status(500).send('Failed to add assignment')
  }
}

export async function updateDeliveryAssignment(req, res) {
  try {
    const assignment = await update(req.params.id, req.body)
    res.json(assignment)
  } catch (err) {
    console.error('Failed to update assignment', err)
    res.status(500).send('Failed to update assignment')
  }
}

export async function deleteDeliveryAssignment(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete assignment', err)
    res.status(500).send('Failed to delete assignment')
  }
}
