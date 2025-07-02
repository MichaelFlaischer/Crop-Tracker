import bcrypt from 'bcrypt'
import { MongoClient, ObjectId } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const dbURL = process.env.MONGODB_URI
const dbName = 'CropTrackerDB'
const collectionName = 'Employees'
const SALT_ROUNDS = 10

async function hashAllpasswords() {
  const client = new MongoClient(dbURL)
  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)

    const users = await collection.find({}).toArray()

    for (const user of users) {
      const currentpassword = user.password

      // נבדוק אם הסיסמה כבר מוצפנת (מתחילה ב־$2b$)
      const isHashed = currentpassword?.startsWith('$2b$')
      if (!currentpassword || isHashed) continue

      const hashed = await bcrypt.hash(currentpassword, SALT_ROUNDS)

      await collection.updateOne({ _id: new ObjectId(user._id) }, { $set: { password: hashed } })

      console.log(`🔐 סיסמה עודכנה בהצלחה עבור המשתמש: ${user.username}`)
    }

    console.log('✅ כל הסיסמאות הוצפנו בהצלחה.')
  } catch (err) {
    console.error('❌ שגיאה בהצפנת הסיסמאות:', err)
  } finally {
    await client.close()
  }
}

hashAllpasswords()
