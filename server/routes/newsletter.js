import { Router } from 'express'
import { Newsletter } from '../models/Newsletter.js'
import { v4 as uuidv4 } from 'uuid'
import { sendNewsletterConfirmation } from '../utils/email.js'

export const newsletterRoutes = Router()

newsletterRoutes.post('/subscribe', async (req, res) => {
  try {
    const { email, frequency = 'weekly' } = req.body
    if (!email) return res.status(400).json({ message: 'Email required' })

    let subscriber = await Newsletter.findOne({ email })
    if (subscriber) {
      subscriber.frequency = frequency
      await subscriber.save()
      return res.json({ message: 'Subscription updated' })
    }

    const confirmToken = uuidv4()
    subscriber = await Newsletter.create({ email, frequency, confirmToken })

    try {
      await sendNewsletterConfirmation(email, confirmToken)
    } catch (e) {
      console.error('Email send failed:', e)
    }

    res.json({ message: 'Check your email to confirm' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
