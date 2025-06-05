import express from 'express'
import { getSeasons, getSeasonById, updateSeason } from './seasons.controller.js'

export const seasonRoutes = express.Router()

seasonRoutes.get('/', getSeasons)
seasonRoutes.get('/:id', getSeasonById)
seasonRoutes.put('/:id', updateSeason)
