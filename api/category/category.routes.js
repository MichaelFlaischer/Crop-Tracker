import express from 'express'
import { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory } from './category.controller.js'

export const categoryRoutes = express.Router()

categoryRoutes.get('/', getCategories)
categoryRoutes.get('/:id', getCategoryById)
categoryRoutes.post('/', addCategory)
categoryRoutes.put('/:id', updateCategory)
categoryRoutes.delete('/:id', deleteCategory)
