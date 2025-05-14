import { query, getById, add, update, remove } from './weighing-report.service.js'

export async function getWeighingReports(req, res) {
  try {
    const reports = await query()
    res.json(reports)
  } catch (err) {
    console.error('Failed to get weighing reports', err)
    res.status(500).send('Failed to get weighing reports')
  }
}

export async function getWeighingReportById(req, res) {
  try {
    const report = await getById(req.params.id)
    res.json(report)
  } catch (err) {
    console.error('Failed to get report by ID', err)
    res.status(500).send('Failed to get report')
  }
}

export async function addWeighingReport(req, res) {
  try {
    const report = await add(req.body)
    res.json(report)
  } catch (err) {
    console.error('Failed to add report', err)
    res.status(500).send('Failed to add report')
  }
}

export async function updateWeighingReport(req, res) {
  try {
    const report = await update(req.params.id, req.body)
    res.json(report)
  } catch (err) {
    console.error('Failed to update report', err)
    res.status(500).send('Failed to update report')
  }
}

export async function deleteWeighingReport(req, res) {
  try {
    await remove(req.params.id)
    res.sendStatus(204)
  } catch (err) {
    console.error('Failed to delete report', err)
    res.status(500).send('Failed to delete report')
  }
}
