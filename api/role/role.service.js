import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export const roleService = {
  query,
  getById,
  add,
  update,
  remove,
}

function toMongoId(id) {
  if (typeof id === 'string' && id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
    return new ObjectId(id)
  }
  throw new Error('Invalid ID format')
}

async function query() {
  const collection = await dbService.getCollection('Roles')
  return await collection.find().sort({ roleName: 1 }).toArray()
}

async function getById(roleId) {
  const collection = await dbService.getCollection('Roles')
  return await collection.findOne({ _id: toMongoId(roleId) })
}

async function add(role) {
  const roleToAdd = {
    roleName: role.roleName,
    description: role.description || '',
    isAdmin: role.isAdmin === true || role.isAdmin === 'true',
  }
  const collection = await dbService.getCollection('Roles')
  const { insertedId } = await collection.insertOne(roleToAdd)
  return { ...roleToAdd, _id: insertedId }
}

async function update(role) {
  const roleToUpdate = {
    roleName: role.roleName,
    description: role.description || '',
    isAdmin: role.isAdmin === true || role.isAdmin === 'true',
  }
  const collection = await dbService.getCollection('Roles')
  await collection.updateOne({ _id: toMongoId(role._id) }, { $set: roleToUpdate })
  return { ...roleToUpdate, _id: role._id }
}

async function remove(roleId) {
  const collection = await dbService.getCollection('Roles')
  await collection.deleteOne({ _id: toMongoId(roleId) })
}
