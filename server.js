import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'

const app = express()
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://michaelfr25:PAaZDGFxuKmY4y9G@cluster0.z1uktem.mongodb.net/sample_mflix?retryWrites=true&w=majority"


const client = new MongoClient(uri)
let db

async function connectToDb() {
  try {
    await client.connect()
    db = client.db('sample_mflix')
    console.log('✅ Connected to MongoDB Atlas')
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message)
  }
}

app.get('/api/comments', async (req, res) => {
  try {
    const comments = await db.collection('comments').find().limit(20).toArray()
    res.json(comments)
  } catch (err) {
    console.error('❌ Error fetching comments:', err)
    res.status(500).send('Error fetching comments')
  }
})

app.listen(3030, () => {
  console.log('🚀 Server running on http://localhost:3030')
  connectToDb()
})
