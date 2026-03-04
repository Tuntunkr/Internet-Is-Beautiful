import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Loader2, Shield } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { API_ERRORS } from '../lib/api'

export function Admin() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [key, setKey] = useState(() => localStorage.getItem('adminKey') || '')
  const [error, setError] = useState('')

  const fetchSubmissions = () => {
    if (!key) return
    setError('')
    fetch('/api/admin/submissions', {
      headers: { 'X-Admin-Key': key },
    })
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 401 ? 'Unauthorized' : 'Server error')
        return r.json()
      })
      .then(setSubmissions)
      .catch((e) => {
        const msg = e?.message?.includes('fetch') || e?.name === 'TypeError'
          ? API_ERRORS.NETWORK
          : (e?.message || API_ERRORS.UNKNOWN)
        setError(msg)
        setSubmissions([])
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (key) {
      localStorage.setItem('adminKey', key)
      fetchSubmissions()
    } else {
      setLoading(false)
    }
  }, [key])

  const approve = (id) => {
    fetch(`/api/admin/submissions/${id}/approve`, {
      method: 'POST',
      headers: { 'X-Admin-Key': key },
    })
      .then((r) => r.ok && fetchSubmissions())
  }

  const reject = (id) => {
    fetch(`/api/admin/submissions/${id}/reject`, {
      method: 'POST',
      headers: { 'X-Admin-Key': key },
    })
      .then((r) => r.ok && fetchSubmissions())
  }

  if (!key) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-md"
      >
        <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-4">
          <Shield className="h-6 w-6" />
          <h1 className="font-display text-2xl font-bold">Admin Login</h1>
        </div>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Admin key"
          className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 focus:border-accent-500 outline-none"
        />
        <Button onClick={() => setKey(key || 'dev-admin-key')} className="mt-4 w-full">
          Enter
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
          Admin Panel
        </h1>
        <button
          onClick={() => { setKey(''); setError(''); }}
          className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Log out
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-accent-500" />
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.filter((s) => s.status === 'pending').length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 py-12 text-center text-gray-500">
              No pending submissions
            </div>
          ) : (
            submissions
              .filter((s) => s.status === 'pending')
              .map((sub) => (
                <div
                  key={sub.id}
                  className="rounded-xl bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/50 p-6"
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white">{sub.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{sub.url}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{sub.description}</p>
                  <div className="mt-4 flex gap-3">
                    <Button variant="primary" onClick={() => approve(sub.id)} className="gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button variant="ghost" onClick={() => reject(sub.id)} className="gap-2 text-red-600">
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </motion.div>
  )
}
