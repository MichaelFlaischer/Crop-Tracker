import express from 'express'
import { getWeighingReports, getWeighingReportById, addWeighingReport, updateWeighingReport, deleteWeighingReport } from './weighing-report.controller.js'

export const weighingreportRoutes = express.Router()

weighingreportRoutes.get('/', getWeighingReports)
weighingreportRoutes.get('/:id', getWeighingReportById)
weighingreportRoutes.post('/', addWeighingReport)
weighingreportRoutes.put('/:id', updateWeighingReport)
weighingreportRoutes.delete('/:id', deleteWeighingReport)
