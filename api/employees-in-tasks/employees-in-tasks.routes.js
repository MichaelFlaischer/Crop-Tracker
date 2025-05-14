import express from 'express'
import { getEmployeesInTasks, getEmployeeInTaskById, addEmployeeInTask, updateEmployeeInTask, deleteEmployeeInTask } from './employees-in-tasks.controller.js'

export const employeesintasksRoutes = express.Router()

employeesintasksRoutes.get('/', getEmployeesInTasks)
employeesintasksRoutes.get('/:id', getEmployeeInTaskById)
employeesintasksRoutes.post('/', addEmployeeInTask)
employeesintasksRoutes.put('/:id', updateEmployeeInTask)
employeesintasksRoutes.delete('/:id', deleteEmployeeInTask)
