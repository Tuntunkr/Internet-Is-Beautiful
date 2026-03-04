import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export function QueueBanner() {
  const [queue, setQueue] = useState({ ahead: 0, avgTime: 24 })

  useEffect(() => {
    let intervalId = null
    const fetchQueue = async () => {
      try {
        const res = await fetch('/api/queue/status')
        if (!res.ok) return false
        const data = await res.json()
        setQueue(data)
        return true
      } catch {
        return false
      }
    }
    fetchQueue().then((ok) => {
      if (ok) intervalId = setInterval(fetchQueue, 60000)
    })
    return () => intervalId && clearInterval(intervalId)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border-2 border-accent-500/20 bg-gradient-to-r from-accent-500/5 to-cyan-500/5 p-5 dark:border-accent-500/30 dark:from-accent-500/10 dark:to-cyan-500/10"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-accent-500/20 bg-white/80 px-4 py-2 dark:border-accent-500/30 dark:bg-white/5">
          <Clock className="h-5 w-5 text-accent-500" />
          <span className="font-medium text-gray-800 dark:text-gray-200">
            <strong className="text-accent-600 dark:text-accent-400">{queue.ahead}</strong> submissions ahead
            <span className="mx-2 text-gray-400">•</span>
            ~{queue.avgTime}h estimated wait
          </span>
        </div>
        <Link
          to="/submit"
          className="group flex items-center gap-2 rounded-xl border-2 border-accent-500/30 bg-accent-500/10 px-4 py-2 font-semibold text-accent-600 transition-all hover:border-accent-500 hover:bg-accent-500/20 hover:shadow-glow dark:text-accent-400"
        >
          <Zap className="h-4 w-4 transition-transform group-hover:scale-110" />
          Skip queue with fast-track
        </Link>
      </div>
    </motion.div>
  )
}
