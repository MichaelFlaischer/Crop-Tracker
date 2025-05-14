import fs from 'fs'
import { getCollection } from './db.service.js'

const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir)
}

export const logger = {
  debug(...args) {
    if (process.env.NODE_ENV === 'production') return
    _doLog('DEBUG', ...args)
  },
  info(...args) {
    _doLog('INFO', ...args)
  },
  warn(...args) {
    _doLog('WARN', ...args)
  },
  error(...args) {
    _doLog('ERROR', ...args)
  },
}

function _getTime() {
  const now = new Date()
  return now.toLocaleString('he') // תאריך בפורמט עברי
}

function _isError(e) {
  return e && e.stack && e.message
}

async function _doLog(level, ...args) {
  let req = null
  let userId = 0

  // בדיקה אם הפרמטר הראשון הוא request
  if (args[0]?.cookies) {
    req = args.shift()
    try {
      userId = +req.cookies.loginToken?.userId || 0
    } catch {
      userId = 0
    }
  }

  const strs = args.map((arg) => {
    if (typeof arg === 'string') return arg
    if (_isError(arg)) return `${arg.message} | ${arg.stack}`
    if (arg instanceof Promise) return 'Promise'
    return JSON.stringify(arg)
  })

  const msg = strs.join(' | ')
  const timestamp = new Date()
  const line = `${_getTime()} - ${level} - userId: ${userId} - ${msg}\n`

  // הדפסה למסך
  console.log(line)

  // כתיבה לקובץ
  fs.appendFile('./logs/backend.log', line, (err) => {
    if (err) console.error('FATAL: cannot write to log file')
  })

  // כתיבה למסד נתונים
  try {
    const collection = await getCollection('logs')
    await collection.insertOne({
      userId,
      level,
      message: msg,
      timestamp,
      logData: msg, // לשמירה בשדה logData כמו במבנה שלך
    })
  } catch (err) {
    console.error('Failed to write log to MongoDB:', err)
  }
}
