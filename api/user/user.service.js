import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

export const userService = {
  query,
  getById,
  getByusername,
  remove,
  update,
  add,
}

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy)
  try {
    const collection = await dbService.getCollection('Employees')
    var users = await collection.find(criteria).sort({ username: 1 }).toArray()
    users = users.map((user) => {
      delete user.password
      user.isHappy = true
      user.createdAt = user._id.getTimestamp()
      return user
    })
    return users
  } catch (err) {
    logger.error('cannot find users', err)
    throw err
  }
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection('Employees')
    const user = await collection.findOne({ _id: new ObjectId(userId) })
    delete user.password
    return user
  } catch (err) {
    logger.error(`while finding user ${userId}`, err)
    throw err
  }
}

async function getByusername(username) {
  try {
    const collection = await dbService.getCollection('Employees')
    const user = await collection.findOne({ username })
    return user
  } catch (err) {
    logger.error(`while finding user ${username}`, err)
    throw err
  }
}

async function remove(userId) {
  try {
    const collection = await dbService.getCollection('Employees')
    await collection.deleteOne({ _id: new ObjectId(userId) })
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }
}

async function update(user) {
  try {
    const userToSave = {
      username: user.username,
      fullName: user.fullName,
      roleId: new ObjectId(user.roleId),
      roleName: user.roleName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      startDate: user.startDate,
      salary: user.salary,
      address: user.address,
      status: user.status,
      isAdmin: user.isAdmin === true || user.isAdmin === 'true',
    }

    if (user.password && typeof user.password === 'string' && user.password.length >= 6) {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(user.password, saltRounds)
      userToSave.password = hashedPassword
    }

    const collection = await dbService.getCollection('Employees')
    const id = new ObjectId(user._id)

    await collection.updateOne({ _id: id }, { $set: userToSave })

    return { ...userToSave, _id: id }
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

async function add(user) {
  try {
    const existUser = await getByusername(user.username)
    if (existUser) throw new Error('username taken')

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)

    const userToAdd = {
      username: user.username,
      password: hashedPassword,
      fullName: user.fullName,
      roleId: new ObjectId(user.roleId || '000000000000000000000002'),
      roleName: user.roleName || 'Employee',
      email: user.email,
      phoneNumber: user.phoneNumber,
      startDate: user.startDate || new Date(),
      salary: user.salary || 0,
      address: user.address || '',
      status: user.status || 'Active',
      isAdmin: user.isAdmin === true || user.isAdmin === 'true',
    }

    const collection = await dbService.getCollection('Employees')
    await collection.insertOne(userToAdd)
    return userToAdd
  } catch (err) {
    logger.error('cannot insert user', err)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    criteria.$or = [{ username: txtCriteria }, { fullName: txtCriteria }]
  }
  return criteria
}
