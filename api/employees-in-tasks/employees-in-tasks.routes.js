import express from 'express'
import { getEmployeesInTasks, getEmployeeInTaskById, addEmployeeInTask, updateEmployeeInTask, deleteEmployeeInTask } from './employees-in-tasks.controller.js'

const router = express.Router()

router.get('/', getEmployeesInTasks)
router.get('/:id', getEmployeeInTaskById)
router.post('/', addEmployeeInTask)
router.put('/:id', updateEmployeeInTask)
router.delete('/:id', deleteEmployeeInTask)

export default router
