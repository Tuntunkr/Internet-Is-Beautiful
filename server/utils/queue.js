import { Submission } from '../models/Submission.js'

const AVG_REVIEW_HOURS = 24

export async function getQueueStatus() {
  const pendingCount = await Submission.countDocuments({ status: 'pending' })
  const avgTime = Math.ceil((pendingCount * AVG_REVIEW_HOURS) / 2) || 24
  return { ahead: pendingCount, avgTime }
}

export async function getNextQueuePosition() {
  const last = await Submission.findOne({ status: 'pending' }).sort({ queuePosition: -1 })
  return (last?.queuePosition || 0) + 1
}
