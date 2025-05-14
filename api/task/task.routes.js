import express from 'express'
import { getTasks, getTaskById, addTask, updateTask, deleteTask } from './task.controller.js'

export const taskRoutes = express.Router()

taskRoutes.get('/', getTasks)
taskRoutes.get('/:id', getTaskById)
taskRoutes.post('/', addTask)
taskRoutes.put('/:id', updateTask)
taskRoutes.delete('/:id', deleteTask)
