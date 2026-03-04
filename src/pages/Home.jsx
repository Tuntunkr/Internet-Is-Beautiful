import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Hero } from '../components/home/Hero'
import { QueueBanner } from '../components/home/QueueBanner'
import { FeaturedHighlight } from '../components/home/FeaturedHighlight'
import { WeeklyNewsletter } from '../components/home/WeeklyNewsletter'
import { WebsiteCard } from '../components/website/WebsiteCard'
import { CardSkeleton } from '../components/ui/Skeleton'
import { mockWebsites } from '../data/mockWebsites'
import { Seo } from '../components/Seo'
import { useLocalSubmissions } from '../context/LocalSubmissionsContext'

const TABS = [
  { id: 'latest', label: 'Latest Projects' },
  { id: 'articles', label: 'Articles' },
]

export function Home() {
  const [activeTab, setActiveTab] = useState('latest')
  const [loading, setLoading] = useState(false)
  const { submissions, toWebsiteFormat } = useLocalSubmissions()

  const localWebsites = useMemo(() => submissions.map(toWebsiteFormat), [submissions, toWebsiteFormat])

  const filteredWebsites = useMemo(() => {
    let list = [...localWebsites, ...mockWebsites]
    if (activeTab === 'articles') list = list.filter((w) => w.category === 'Tool' || w.category === 'Library')
    return list
  }, [activeTab, localWebsites])

  return (
    <div className="space-y-12">
      <Seo title="Curated for the Builders" />
      <Hero />

      <QueueBanner />

      <section>
        <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-accent-600 dark:text-accent-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

        <div className="mt-8">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredWebsites.map((website, i) => (
                  <WebsiteCard key={website.id} website={website} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
          {!loading && filteredWebsites.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 py-16 text-center text-gray-500 dark:text-gray-400">
              No projects found.
            </div>
          )}
        </div>
      </section>

      <FeaturedHighlight />

      <WeeklyNewsletter />
    </div>
  )
}
