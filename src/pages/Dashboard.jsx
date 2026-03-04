import { motion } from 'framer-motion'
import { Bookmark, Send, Clock, CheckCircle, XCircle, CloudOff } from 'lucide-react'
import { useBookmarks } from '../context/BookmarkContext'
import { useLocalSubmissions } from '../context/LocalSubmissionsContext'
import { WebsiteCard } from '../components/website/WebsiteCard'
import { Link } from 'react-router-dom'

const STATUS_LABELS = {
  pending: { label: 'Pending', icon: Clock, color: 'text-amber-600' },
  approved: { label: 'Approved', icon: CheckCircle, color: 'text-green-600' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'text-red-600' },
  local: { label: 'Saved locally', icon: CloudOff, color: 'text-blue-600' },
}

export function Dashboard() {
  const { bookmarks } = useBookmarks()
  const { submissions, toWebsiteFormat, removeSubmission } = useLocalSubmissions()

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
          Your Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track your submissions and manage bookmarks.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Send className="h-5 w-5" />
          Your Submissions
        </h2>
        {submissions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No submissions yet.</p>
            <Link to="/submit" className="mt-4 inline-block text-accent-600 dark:text-accent-400 hover:underline font-medium">
              Submit a project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((s) => {
              const status = STATUS_LABELS[s.isLocal ? 'local' : s.status] || STATUS_LABELS.pending
              const Icon = status.icon
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-xl bg-white/70 dark:bg-gray-800/70 border border-white/20 dark:border-gray-700/50 p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{s.title}</p>
                    <p className="text-sm text-gray-500">{s.url}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1 text-sm font-medium ${status.color}`}>
                      <Icon className="h-4 w-4" />
                      {status.label}
                    </span>
                    {s.isLocal && (
                      <button
                        onClick={() => removeSubmission(s.id)}
                        className="text-xs text-gray-500 hover:text-red-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Bookmark className="h-5 w-5" />
          Bookmarked Projects ({bookmarks.length})
        </h2>
        {bookmarks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 p-12 text-center text-gray-500 dark:text-gray-400">
            No bookmarks yet. Browse projects and bookmark your favorites.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((item, i) => (
              <WebsiteCard key={item.id} website={item} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
