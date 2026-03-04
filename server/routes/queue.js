import { Router } from 'express'
import { getQueueStatus } from '../utils/queue.js'

export const queueRoutes = Router()

queueRoutes.get('/status', async (req, res) => {
  try {
    const status = await getQueueStatus()
    res.json(status)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
