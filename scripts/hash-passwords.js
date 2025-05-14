import { dbService } from '../services/db.service.js'
import bcrypt from 'bcrypt'

async function hashPasswords() {
  const collection = await dbService.getCollection('Employees')
  const users = await collection.find().toArray()

  for (const user of users) {
    const pwd = user.Password
    // אם הסיסמה כבר מוצפנת (נראית כמו bcrypt hash), דלג
    if (typeof pwd === 'string' && pwd.startsWith('$2b$')) {
      console.log(`✔ Password already hashed for user: ${user.Username}`)
      continue
    }

    // הצפנת הסיסמה
    const hash = await bcrypt.hash(pwd, 10)
    await collection.updateOne({ _id: user._id }, { $set: { Password: hash } })
    console.log(`🔐 Hashed password for user: ${user.Username}`)
  }

  console.log('✅ Hashing complete')
  process.exit()
}

hashPasswords().catch((err) => {
  console.error('❌ Error while hashing passwords:', err)
  process.exit(1)
})
