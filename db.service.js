import { MongoClient } from 'mongodb'

const url = process.env.MONGO_URL
const dbName = 'agri_db'
let dbConn = null

export async function getCollection(collectionName) {
  const db = await connect()
  return db.collection(collectionName)
}

async function connect() {
  if (dbConn) return dbConn
  const client = await MongoClient.connect(url)
  dbConn = client.db(dbName)
  return dbConn
}
