import express from 'express'
import { getSampleTypes, getSampleTypeById, addSampleType, updateSampleType, deleteSampleType } from './sample-type.controller.js'

export const sampletypeRoutes = express.Router()

sampletypeRoutes.get('/', getSampleTypes)
sampletypeRoutes.get('/:id', getSampleTypeById)
sampletypeRoutes.post('/', addSampleType)
sampletypeRoutes.put('/:id', updateSampleType)
sampletypeRoutes.delete('/:id', deleteSampleType)
