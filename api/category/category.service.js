import { dbService } from '../../db.service.js'
import { ObjectId } from 'mongodb'

const COLLECTION = 'category'

export const categoryService = {
  query,
  getById,
  add,
  update,
  remove,
}

async function query() {
  try {
    const collection = await dbService.getCollection(COLLECTION)
    return await collection.find().toArray()
  } catch (err) {
    console.error('Cannot query categories', err)
    throw err
  }
}

async function getById(id) {
  try {
    const collection = await dbService.getCollection(COLLECTION)
    return await collection.findOne({ _id: new ObjectId(id) })
  } catch (err) {
    console.error(`Cannot get category with id ${id}`, err)
    throw err
  }
}

async function add(category) {
  try {
    const collection = await dbService.getCollection(COLLECTION)
    const result = await collection.insertOne(category)
    return { ...category, _id: result.insertedId }
  } catch (err) {
    console.error('Cannot insert category', err)
    throw err
  }
}

async function update(id, category) {
  try {
    const collection = await dbService.getCollection(COLLECTION)
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: category })
    return { ...category, _id: id }
  } catch (err) {
    console.error(`Cannot update category with id ${id}`, err)
    throw err
  }
}

async function remove(id) {
  try {
    const collection = await dbService.getCollection(COLLECTION)
    await collection.deleteOne({ _id: new ObjectId(id) })
  } catch (err) {
    console.error(`Cannot delete category with id ${id}`, err)
    throw err
  }
}
