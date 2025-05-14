import express from 'express'
import { getRoles, getRoleById, addRole, updateRole, deleteRole } from './role.controller.js'

export const roleRoutes = express.Router()

roleRoutes.get('/', getRoles)
roleRoutes.get('/:id', getRoleById)
roleRoutes.post('/', addRole)
roleRoutes.put('/:id', updateRole)
roleRoutes.delete('/:id', deleteRole)
