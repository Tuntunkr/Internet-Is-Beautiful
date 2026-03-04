import { Router } from 'express'
import { Submission } from '../models/Submission.js'
import { getQueueStatus } from '../utils/queue.js'

export const submissionRoutes = Router()

submissionRoutes.get('/status/:token', async (req, res) => {
  try {
    const submission = await Submission.findOne({ trackingToken: req.params.token })
    if (!submission) return res.status(404).json({ message: 'Not found' })

    const queue = await getQueueStatus()
    const position = submission.status === 'pending'
      ? await Submission.countDocuments({ status: 'pending', queuePosition: { $lte: submission.queuePosition } })
      : null

    res.json({
      status: submission.status,
      title: submission.title,
      queuePosition: position,
      queueAhead: queue.ahead,
      estimatedHours: queue.avgTime,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
