import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Button } from '../ui/Button'
import { api, API_ERRORS } from '../../lib/api'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [frequency, setFrequency] = useState('weekly')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setErrorMsg('')
    try {
      await api.subscribeNewsletter(email, frequency)
      setStatus('success')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err?.message || API_ERRORS.UNKNOWN)
    }
  }

  return (
    <div>
      <h3 className="mb-2 font-display text-lg font-bold text-white">
        Subscribe for latest updates
      </h3>
      <p className="mb-4 text-sm text-slate-400">
        Newly launched Web3 apps, hidden gems, tools for builders, articles, grants — straight to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading'}
            className="w-full rounded-xl border-2 border-white/10 bg-white/5 pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all disabled:opacity-50"
          />
        </div>
        <div className="flex gap-6">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="frequency"
              value="daily"
              checked={frequency === 'daily'}
              onChange={(e) => setFrequency(e.target.value)}
              className="rounded-full border-white/20 text-accent-500 focus:ring-accent-500"
            />
            <span className="text-sm text-slate-400">Daily</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="radio"
              name="frequency"
              value="weekly"
              checked={frequency === 'weekly'}
              onChange={(e) => setFrequency(e.target.value)}
              className="rounded-full border-white/20 text-accent-500 focus:ring-accent-500"
            />
            <span className="text-sm text-slate-400">Weekly</span>
          </label>
        </div>
        <Button type="submit" variant="primary" className="w-full rounded-xl font-semibold" disabled={status === 'loading'}>
          {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
        </Button>
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-accent-400"
          >
            Thanks! Check your inbox to confirm.
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500"
          >
            {errorMsg}
          </motion.p>
        )}
      </form>
    </div>
  )
}
