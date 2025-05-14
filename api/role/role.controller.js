import { roleService } from './role.service.js'
import { logger } from '../../services/logger.service.js'

export async function getRoles(req, res) {
  try {
    const roles = await roleService.query()
    res.json(roles)
  } catch (err) {
    logger.error('Cannot get roles', err)
    res.status(500).send('Failed to get roles')
  }
}

export async function getRoleById(req, res) {
  try {
    const role = await roleService.getById(req.params.id)
    res.json(role)
  } catch (err) {
    logger.error('Cannot get role by id', err)
    res.status(500).send('Failed to get role')
  }
}

export async function addRole(req, res) {
  try {
    const newRole = await roleService.add(req.body)
    res.json(newRole)
  } catch (err) {
    logger.error('Cannot add role', err)
    res.status(500).send('Failed to add role')
  }
}

export async function updateRole(req, res) {
  try {
    const updatedRole = await roleService.update(req.body)
    res.json(updatedRole)
  } catch (err) {
    logger.error('Cannot update role', err)
    res.status(500).send('Failed to update role')
  }
}

export async function deleteRole(req, res) {
  try {
    await roleService.remove(req.params.id)
    res.send({ msg: 'Deleted successfully' })
  } catch (err) {
    logger.error('Cannot delete role', err)
    res.status(500).send('Failed to delete role')
  }
}
