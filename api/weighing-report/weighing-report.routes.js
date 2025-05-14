import express from 'express'
import { getWeighingReports, getWeighingReportById, addWeighingReport, updateWeighingReport, deleteWeighingReport } from './weighing-report.controller.js'

const router = express.Router()

router.get('/', getWeighingReports)
router.get('/:id', getWeighingReportById)
router.post('/', addWeighingReport)
router.put('/:id', updateWeighingReport)
router.delete('/:id', deleteWeighingReport)

export default router
