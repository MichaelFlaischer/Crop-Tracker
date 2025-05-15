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
  console.log('add-add-add-add-add-add')

  const roleToAdd = {
    RoleName: role.name,
    Description: role.description || '',
    IsAdmin: role.isAdmin === true || role.isAdmin === 'true',
  }
  const collection = await dbService.getCollection('Roles')
  const { insertedId } = await collection.insertOne(roleToAdd)
  return { ...roleToAdd, _id: insertedId }
}

async function update(role) {
  console.log('update-update-update-update-update-update')
  console.log(role)

  const roleToUpdate = {
    RoleName: role.RoleName,
    Description: role.Description || '',
    IsAdmin: role.IsAdmin === true || role.IsAdmin === 'true',
  }
  const collection = await dbService.getCollection('Roles')
  await collection.updateOne({ _id: ObjectId.createFromHexString(role._id) }, { $set: roleToUpdate })
  return { ...roleToUpdate, _id: role._id }
}

async function remove(roleId) {
  const collection = await dbService.getCollection('Roles')
  await collection.deleteOne({ _id: ObjectId.createFromHexString(roleId) })
}
