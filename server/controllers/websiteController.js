import { Website } from '../models/Website.js'
import { Submission } from '../models/Submission.js'
import { getNextQueuePosition } from '../utils/queue.js'
import { sendSubmissionConfirmation } from '../utils/email.js'

export async function getWebsites(req, res) {
  try {
    const { tag, category, trending, limit = 50 } = req.query
    const filter = { status: 'approved' }
    if (tag) filter.tags = tag
    if (category) filter.category = category
    if (trending === 'true') filter.trending = true

    const websites = await Website.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit, 10))
      .lean()

    res.json(websites.map((w) => ({ ...w, id: w._id.toString() })))
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function getWebsite(req, res) {
  try {
    const website = await Website.findById(req.params.id)
    if (!website) return res.status(404).json({ message: 'Not found' })
    res.json({ ...website.toObject(), id: website._id.toString() })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export async function submitWebsite(req, res) {
  try {
    const { url, title, category, description, tags, twitter, github, image, email } = req.body
    if (!url || !title || !category || !description || !email) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const position = await getNextQueuePosition()
    const submission = await Submission.create({
      url,
      title,
      category,
      description,
      tags: Array.isArray(tags) ? tags : [],
      twitter,
      github,
      image,
      email,
      queuePosition: position,
    })

    try {
      await sendSubmissionConfirmation(email, submission.trackingToken, title)
    } catch (e) {
      console.error('Email send failed:', e)
    }

    res.status(201).json({
      id: submission._id.toString(),
      trackingToken: submission.trackingToken,
      trackingUrl: `${process.env.BASE_URL || 'http://localhost:5173'}/track/${submission.trackingToken}`,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
