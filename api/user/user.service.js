import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

export const userService = {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add,
}

async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy)
  try {
    const collection = await dbService.getCollection('Employees')
    var users = await collection.find(criteria).sort({ Username: 1 }).toArray()
    users = users.map((user) => {
      delete user.Password
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
    const user = await collection.findOne({ _id: ObjectId.createFromHexString(userId) })
    delete user.Password
    return user
  } catch (err) {
    logger.error(`while finding user ${userId}`, err)
    throw err
  }
}

async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection('Employees')
    const user = await collection.findOne({ Username: username })
    console.log(user)

    return user
  } catch (err) {
    logger.error(`while finding user ${username}`, err)
    throw err
  }
}

async function remove(userId) {
  try {
    const collection = await dbService.getCollection('Employees')
    await collection.deleteOne({ _id: ObjectId.createFromHexString(userId) })
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }
}

async function update(user) {
  try {
    const userToSave = {
      _id: ObjectId.createFromHexString(user._id),
      Username: user.Username,
      FullName: user.FullName,
      RoleID: user.RoleID,
      RoleName: user.RoleName,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      StartDate: user.StartDate,
      Salary: user.Salary,
      Address: user.Address,
      Status: user.Status,
      IsAdmin: user.IsAdmin,
    }

    if (user.Password && typeof user.Password === 'string' && user.Password.length >= 6) {
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(user.Password, saltRounds)
      userToSave.Password = hashedPassword
    }

    const collection = await dbService.getCollection('Employees')

    await collection.updateOne(
      { _id: userToSave._id },
      {
        $set: userToSave,
        $unset: { isAdmin: '' },
      }
    )

    return userToSave
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

async function add(user) {
  try {
    const existUser = await getByUsername(user.Username)
    if (existUser) throw new Error('Username taken')

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(user.Password, saltRounds)

    const userToAdd = {
      Username: user.Username,
      Password: hashedPassword,
      FullName: user.FullName,
      RoleID: user.RoleID || 2,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      StartDate: user.StartDate || new Date(),
      Salary: user.Salary || 0,
      Address: user.Address || '',
      Status: user.Status || 'Active',
      IsAdmin: user.IsAdmin === true || user.IsAdmin === 'true',
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
    criteria.$or = [
      {
        Username: txtCriteria,
      },
      {
        FullName: txtCriteria,
      },
    ]
  }
  return criteria
}
