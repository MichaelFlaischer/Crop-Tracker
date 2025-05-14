import express from 'express'
import { getLogs, getLogById, addLog, updateLog, deleteLog } from './log.controller.js'

const router = express.Router()

router.get('/', getLogs)
router.get('/:id', getLogById)
router.post('/', addLog)
router.put('/:id', updateLog)
router.delete('/:id', deleteLog)

export default router
