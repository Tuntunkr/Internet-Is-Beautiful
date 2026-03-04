import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles } from 'lucide-react'
import { WebsiteCard } from '../components/website/WebsiteCard'
import { mockWebsites } from '../data/mockWebsites'
import { useLocalSubmissions } from '../context/LocalSubmissionsContext'

export function Projects() {
  const [search, setSearch] = useState('')
  const { submissions, toWebsiteFormat } = useLocalSubmissions()
  const localWebsites = useMemo(() => submissions.map(toWebsiteFormat), [submissions, toWebsiteFormat])

  const filtered = useMemo(() => {
    let list = [...localWebsites, ...mockWebsites]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return list
  }, [search, localWebsites])

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-2xl border-2 border-accent-500/20 bg-gradient-to-br from-gray-50 to-accent-50/30 p-8 sm:p-10 dark:border-accent-500/20 dark:from-[#0a0f1a] dark:to-[#0a0f1a]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 h-64 w-64 rounded-full bg-accent-500/10 blur-[80px] dark:bg-accent-500/15" />
          <div className="absolute -bottom-1/2 -left-1/2 h-96 w-96 rounded-full bg-cyan-500/5 blur-[100px] dark:bg-cyan-500/10" />
        </div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-4 py-1.5 text-sm text-accent-600 dark:bg-accent-500/5 dark:text-accent-400"
          >
            <Sparkles className="h-4 w-4" />
            <span>Curated collection</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 font-display text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white"
          >
            All Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-gray-600 dark:text-slate-400"
          >
            Browse curated Web3 projects, tools, and resources.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative mt-6 max-w-md"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 dark:text-slate-500" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-xl border-2 border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-slate-500 dark:focus:border-accent-500 dark:focus:bg-white/10"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((website, i) => (
          <WebsiteCard key={website.id} website={website} index={i} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border-2 border-dashed border-accent-500/20 bg-accent-500/5 py-16 text-center"
        >
          <p className="text-slate-400">No projects found.</p>
          <p className="mt-2 text-sm text-slate-500">Try a different search term.</p>
        </motion.div>
      )}
    </div>
  )
}
