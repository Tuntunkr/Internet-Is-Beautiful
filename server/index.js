import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import { websiteRoutes } from './routes/websites.js'
import { newsletterRoutes } from './routes/newsletter.js'
import { queueRoutes } from './routes/queue.js'
import { stripeRoutes } from './routes/stripe.js'
import { submissionRoutes } from './routes/submissions.js'
import { adminRoutes } from './routes/admin.js'
import { analyticsRoutes } from './routes/analytics.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/websites', websiteRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/queue', queueRoutes)
app.use('/api/stripe', stripeRoutes)
app.use('/api/submissions', submissionRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/analytics', analyticsRoutes)

app.get('/api/health', (_, res) => res.json({ ok: true }))

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}).catch((err) => {
  console.error('DB connection failed:', err)
  process.exit(1)
})
