import mongoose from 'mongoose'

const newsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  frequency: { type: String, enum: ['daily', 'weekly'], default: 'weekly' },
  confirmed: { type: Boolean, default: false },
  confirmToken: String,
  createdAt: { type: Date, default: Date.now },
})

export const Newsletter = mongoose.model('Newsletter', newsletterSchema)
