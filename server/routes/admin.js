import { Router } from 'express'
import { Submission } from '../models/Submission.js'
import { Website } from '../models/Website.js'

const ADMIN_KEY = process.env.ADMIN_KEY || 'dev-admin-key'

function authAdmin(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.adminKey
  if (key !== ADMIN_KEY) return res.status(401).json({ message: 'Unauthorized' })
  next()
}

export const adminRoutes = Router()

adminRoutes.use(authAdmin)

adminRoutes.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 }).lean()
    res.json(submissions.map((s) => ({ ...s, id: s._id.toString() })))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

adminRoutes.post('/submissions/:id/approve', async (req, res) => {
  try {
    const sub = await Submission.findById(req.params.id)
    if (!sub) return res.status(404).json({ message: 'Not found' })

    sub.status = 'approved'
    sub.reviewedAt = new Date()
    await sub.save()

    await Website.create({
      url: sub.url,
      title: sub.title,
      category: sub.category,
      description: sub.description,
      tags: sub.tags,
      image: sub.image,
      twitter: sub.twitter,
      github: sub.github,
    })

    res.json({ message: 'Approved' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

adminRoutes.post('/submissions/:id/reject', async (req, res) => {
  try {
    const sub = await Submission.findById(req.params.id)
    if (!sub) return res.status(404).json({ message: 'Not found' })

    sub.status = 'rejected'
    sub.reviewedAt = new Date()
    await sub.save()

    res.json({ message: 'Rejected' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
