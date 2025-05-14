import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'

export const roleService = {
  query,
  getById,
  add,
  update,
  remove,
}

async function query() {
  const collection = await dbService.getCollection('Roles')
  return await collection.find().sort({ RoleName: 1 }).toArray()
}

async function getById(roleId) {
  const collection = await dbService.getCollection('Roles')
  return await collection.findOne({ _id: ObjectId.createFromHexString(roleId) })
}

async function add(role) {
  const roleToAdd = {
    RoleName: role.RoleName,
    Description: role.Description || '',
  }
  const collection = await dbService.getCollection('Roles')
  const { insertedId } = await collection.insertOne(roleToAdd)
  return { ...roleToAdd, _id: insertedId }
}

async function update(role) {
  const roleToUpdate = {
    RoleName: role.RoleName,
    Description: role.Description,
  }
  const collection = await dbService.getCollection('Roles')
  await collection.updateOne({ _id: ObjectId.createFromHexString(role._id) }, { $set: roleToUpdate })
  return role
}

async function remove(roleId) {
  const collection = await dbService.getCollection('Roles')
  await collection.deleteOne({ _id: ObjectId.createFromHexString(roleId) })
}
