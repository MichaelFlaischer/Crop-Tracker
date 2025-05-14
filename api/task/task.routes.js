import express from 'express'
import { getTasks, getTaskById, addTask, updateTask, deleteTask } from './task.controller.js'

const router = express.Router()

router.get('/', getTasks)
router.get('/:id', getTaskById)
router.post('/', addTask)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

export default router
