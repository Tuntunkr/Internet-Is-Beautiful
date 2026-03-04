import { Router } from 'express'
import Stripe from 'stripe'
import { Submission } from '../models/Submission.js'

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null

export const stripeRoutes = Router()

stripeRoutes.post('/create-checkout', async (req, res) => {
  if (!stripe) return res.status(503).json({ message: 'Stripe not configured' })

  try {
    const { submissionId } = req.body
    const submission = await Submission.findById(submissionId)
    if (!submission) return res.status(404).json({ message: 'Submission not found' })
    if (submission.fastTrack) return res.status(400).json({ message: 'Already fast-tracked' })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Fast-track submission review' },
          unit_amount: 1999, // $19.99
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.BASE_URL || 'http://localhost:5173'}/track/${submission.trackingToken}?fastrack=success`,
      cancel_url: `${process.env.BASE_URL || 'http://localhost:5173'}/submit`,
      metadata: { submissionId: submission._id.toString() },
    })

    submission.stripeSessionId = session.id
    await submission.save()

    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
