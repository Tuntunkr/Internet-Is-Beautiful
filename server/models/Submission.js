import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const submissionSchema = new mongoose.Schema({
  trackingToken: { type: String, default: () => uuidv4(), unique: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  image: String,
  twitter: String,
  github: String,
  email: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  fastTrack: { type: Boolean, default: false },
  stripeSessionId: String,
  queuePosition: Number,
  createdAt: { type: Date, default: Date.now },
  reviewedAt: Date,
})

export const Submission = mongoose.model('Submission', submissionSchema)
