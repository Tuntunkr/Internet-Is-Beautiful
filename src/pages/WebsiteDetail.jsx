import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Twitter, Github, ExternalLink, ArrowLeft, Bookmark } from 'lucide-react'
import { mockWebsites } from '../data/mockWebsites'
import { useBookmarks } from '../context/BookmarkContext'
import { useLocalSubmissions } from '../context/LocalSubmissionsContext'
import { Button } from '../components/ui/Button'
import { Seo } from '../components/Seo'

export function WebsiteDetail() {
  const { id } = useParams()
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const { submissions, toWebsiteFormat } = useLocalSubmissions()
  const localWebsite = submissions.find((s) => s.id === id)
  const website = localWebsite
    ? toWebsiteFormat(localWebsite)
    : mockWebsites.find((w) => w.id === id)

  if (!website) {
    return (
      <>
        <Seo title="Not Found" />
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project not found</h1>
          <Link to="/" className="mt-4 inline-block text-accent-600 hover:underline dark:text-accent-400">
            Back to Home
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Seo title={website.title} description={website.description} image={website.image} path={`/website/${website.id}`} />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <div className="overflow-hidden rounded-2xl border-2 border-gray-200/80 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#0a0f1a] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]">
          <div className="relative h-64 sm:h-80">
            <img
              src={website.image}
              alt={website.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="rounded-lg border border-white/20 bg-black/50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {website.category}
                </span>
                <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                  {website.title}
                </h1>
              </div>
              <button
                onClick={() => toggleBookmark(website)}
                className="rounded-xl border border-white/20 bg-black/50 p-2.5 backdrop-blur-sm transition-all hover:scale-105 hover:border-accent-500/40 hover:bg-accent-500/20"
                aria-label={isBookmarked(website.id) ? 'Remove bookmark' : 'Add bookmark'}
              >
                <Bookmark
                  className={`h-6 w-6 transition-colors ${isBookmarked(website.id) ? 'fill-accent-400 text-accent-400' : 'text-white/90'}`}
                />
              </button>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-slate-400">
              {website.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {website.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-accent-500/20 bg-accent-500/5 px-3 py-1 text-sm font-medium text-accent-600 dark:text-accent-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-gray-200 pt-8 dark:border-white/10">
              <a href={website.url} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="gap-2 shadow-glow">
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </Button>
              </a>
              <a
                href={website.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 transition-all hover:border-accent-500/30 hover:bg-accent-500/10 hover:text-accent-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-accent-500/30 dark:hover:bg-accent-500/10 dark:hover:text-accent-400"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={website.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-gray-200 text-gray-500 transition-all hover:border-accent-500/30 hover:bg-accent-500/10 hover:text-accent-600 dark:border-white/10 dark:text-slate-400 dark:hover:border-accent-500/30 dark:hover:bg-accent-500/10 dark:hover:text-accent-400"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    </>
  )
}
