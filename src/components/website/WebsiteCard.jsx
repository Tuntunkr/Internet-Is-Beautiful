import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Twitter, Github, ExternalLink, TrendingUp, Bookmark } from 'lucide-react'
import { useBookmarks } from '../../context/BookmarkContext'

export function WebsiteCard({ website, index = 0 }) {
  const { toggleBookmark, isBookmarked } = useBookmarks()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group/card"
    >
      <motion.article
        whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
        className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-accent-500/30 hover:shadow-[0_12px_40px_-8px_rgba(16,185,129,0.15)] dark:border-white/10 dark:bg-[#0a0f1a] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)] dark:hover:border-accent-500/40 dark:hover:shadow-[0_16px_48px_-12px_rgba(16,185,129,0.2)]"
      >
        {/* Subtle accent glow on hover */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, transparent 50%, rgba(34,211,238,0.04) 100%)' }} />

        <Link to={`/website/${website.id}`} className="block">
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={website.image}
              alt={website.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
            {/* Gradient overlay - dark at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/0 to-accent-500/0 transition-colors duration-300 group-hover/card:from-accent-500/5 group-hover/card:to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-white/15 bg-black/50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/95 backdrop-blur-md">
                {website.category}
              </span>
              {website.isLocal && (
                <span className="rounded-lg bg-accent-500/90 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-accent-500/25">
                  New
                </span>
              )}
              {website.trending && !website.isLocal && (
                <span className="flex items-center gap-1.5 rounded-lg bg-accent-500/95 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-accent-500/25">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +{website.engagement}
                </span>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault()
                toggleBookmark(website)
              }}
              className="absolute top-4 right-4 rounded-xl border border-white/15 bg-black/50 p-2.5 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:border-accent-500/40 hover:bg-accent-500/20"
              aria-label={isBookmarked(website.id) ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Bookmark
                className={`h-5 w-5 transition-colors ${isBookmarked(website.id) ? 'fill-accent-400 text-accent-400' : 'text-white/90'}`}
              />
            </button>
          </div>
        </Link>

        <div className="relative p-6">
          <Link to={`/website/${website.id}`}>
            <h3 className="font-display text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover/card:text-accent-600 line-clamp-1 dark:text-white dark:group-hover/card:text-accent-400">
              {website.title}
            </h3>
          </Link>
          <p className="mt-2.5 text-sm leading-relaxed text-gray-600 line-clamp-2 dark:text-slate-400">
            {website.description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {website.tags.slice(0, 3).map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.03 }}
                className="rounded-lg border border-accent-500/20 bg-accent-500/5 px-3 py-1 text-xs font-medium text-accent-600 dark:text-accent-400"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Footer actions */}
          <div className="mt-5 flex items-center gap-1 border-t border-gray-200/80 pt-4 dark:border-white/10">
            <a
              href={website.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-2.5 text-slate-400 transition-all duration-200 hover:bg-accent-500/10 hover:text-accent-400"
              aria-label="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={website.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl p-2.5 text-slate-400 transition-all duration-200 hover:bg-accent-500/10 hover:text-accent-400"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <Link
              to={`/website/${website.id}`}
              className="ml-auto flex items-center gap-2 rounded-xl border border-accent-500/30 bg-accent-500/5 px-4 py-2 text-sm font-semibold text-accent-600 transition-all duration-200 hover:border-accent-500/50 hover:bg-accent-500/15 dark:text-accent-400"
              aria-label="View details"
            >
              View
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}
