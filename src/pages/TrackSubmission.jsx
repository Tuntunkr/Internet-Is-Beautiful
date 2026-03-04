import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api, API_ERRORS } from '../lib/api'

export function TrackSubmission() {
  const { token } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return
    api.getSubmissionStatus(token)
      .then(setData)
      .catch((err) => {
        setData(null)
        setError(err?.message || API_ERRORS.UNKNOWN)
      })
      .finally(() => setLoading(false))
  }, [token])

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent-500" />
      </div>
    )
  }

  if (!data) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20 p-8 text-center"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {error?.includes('Unable to connect') ? 'Server unavailable' : 'Submission not found'}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          {error || 'Check your tracking link or try again later.'}
        </p>
        <Link to="/" className="mt-4 inline-block text-accent-600 hover:underline">Back to Home</Link>
      </motion.div>
    )
  }

  const statusConfig = {
    pending: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', label: 'In Review' },
    approved: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', label: 'Approved' },
    rejected: { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', label: 'Rejected' },
  }

  const config = statusConfig[data.status] || statusConfig.pending
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-lg"
    >
      <div className={`rounded-2xl border p-8 ${config.bg}`}>
        <div className="flex items-center gap-4">
          <Icon className={`h-12 w-12 ${config.color}`} />
          <div>
            <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
              {data.title}
            </h1>
            <p className={`font-medium ${config.color}`}>{config.label}</p>
          </div>
        </div>

        {data.status === 'pending' && (
          <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>Position in queue: <strong>{data.queuePosition || data.queueAhead}</strong></p>
            <p>Estimated wait: <strong>~{data.estimatedHours}h</strong></p>
          </div>
        )}

        {data.status === 'approved' && (
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            Your project has been approved and is now live on Internet Is Beautiful!
          </p>
        )}

        {data.status === 'rejected' && (
          <p className="mt-6 text-gray-600 dark:text-gray-400">
            Unfortunately your submission was not approved. You can submit again with updates.
          </p>
        )}
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-accent-600 dark:text-accent-400 hover:underline font-medium">
          Back to Home
        </Link>
      </div>
    </motion.div>
  )
}
