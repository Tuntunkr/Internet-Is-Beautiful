import mongoose from 'mongoose'

const analyticsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
})

export const Analytics = mongoose.model('Analytics', analyticsSchema)
