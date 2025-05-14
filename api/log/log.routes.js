import express from 'express'
import { getLogs, getLogById, addLog, updateLog, deleteLog } from './log.controller.js'

export const logRoutes = express.Router()

logRoutes.get('/', getLogs)
logRoutes.get('/:id', getLogById)
logRoutes.post('/', addLog)
logRoutes.put('/:id', updateLog)
logRoutes.delete('/:id', deleteLog)
