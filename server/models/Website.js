import mongoose from 'mongoose'

const websiteSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String }],
  image: String,
  twitter: String,
  github: String,
  engagement: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  status: { type: String, enum: ['approved', 'rejected', 'pending'], default: 'approved' },
  createdAt: { type: Date, default: Date.now },
})

export const Website = mongoose.model('Website', websiteSchema)
