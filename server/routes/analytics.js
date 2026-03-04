import { Router } from 'express'
import { Analytics } from '../models/Analytics.js'

export const analyticsRoutes = Router()

const VISITS_KEY = 'total_visits'

analyticsRoutes.get('/visits', async (req, res) => {
  try {
    let doc = await Analytics.findOne({ key: VISITS_KEY })
    if (!doc) {
      doc = await Analytics.create({ key: VISITS_KEY, value: 0 })
    }
    res.json({ count: doc.value })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

analyticsRoutes.post('/visit', async (req, res) => {
  try {
    let doc = await Analytics.findOneAndUpdate(
      { key: VISITS_KEY },
      { $inc: { value: 1 }, updatedAt: new Date() },
      { new: true, upsert: true }
    )
    res.json({ count: doc.value })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
