import * as seasonService from './seasons.service.js'

export async function getSeasons(req, res) {
  try {
    const seasons = await seasonService.query()
    res.json(seasons)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch seasons' })
  }
}

export async function getSeasonById(req, res) {
  try {
    const season = await seasonService.getById(req.params.id)
    if (!season) return res.status(404).json({ error: 'Season not found' })
    res.json(season)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch season' })
  }
}

export async function updateSeason(req, res) {
  try {
    const updated = await seasonService.update(req.params.id, req.body)
    if (!updated) return res.status(404).json({ error: 'Season not found for update' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update season' })
  }
}
