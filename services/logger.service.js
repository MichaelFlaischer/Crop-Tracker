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
  return new Date().toLocaleString('he')
}

function _isError(e) {
  return e && e.stack && e.message
}

function _toLogString(arg) {
  if (typeof arg === 'string') return arg
  if (_isError(arg)) return `${arg.message}\n${arg.stack}`
  if (arg instanceof Promise) return 'Promise'
  return JSON.stringify(arg, null, 2)
}

function _doLog(level, ...args) {
  const msg = args.map(_toLogString).join(' | ')
  const line = `${_getTime()} - ${level} - ${msg}\n`

  // 1. הדפסת הלוג לקונסול
  console.log(line)

  // 2. כתיבה לקובץ
  fs.appendFile('./logs/backend.log', line, (err) => {
    if (err) console.error('FATAL: cannot write to log file', err)
  })

  // 3. כתיבה למסד
  const logEntry = {
    userId: _extractUserId(args),
    level,
    message: msg,
    timestamp: new Date(),
    logData: msg,
  }

  _saveToDb(logEntry)
}

async function _saveToDb(entry) {
  try {
    const collection = await getCollection('Logs')
    await collection.insertOne(entry)
  } catch (err) {
    console.error('Failed to write log to MongoDB:', err)
  }
}

// אופציונלי – מנסה לחלץ userId מתוך פרמטרים אם קיים
function _extractUserId(args) {
  for (const arg of args) {
    if (arg && typeof arg === 'object' && 'userId' in arg) {
      return arg.userId
    }
  }
  return null
}
