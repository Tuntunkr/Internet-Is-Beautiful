import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Home, FolderOpen, LayoutDashboard, Heart, Plus, FileText, Shield } from 'lucide-react'
import { mockWebsites } from '../data/mockWebsites'

const commands = [
  { id: 'home', label: 'Go to Home', path: '/', icon: Home },
  { id: 'projects', label: 'Go to Projects', path: '/projects', icon: FolderOpen },
  { id: 'dashboard', label: 'Go to Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { id: 'donate', label: 'Go to Donate', path: '/donate', icon: Heart },
  { id: 'submit', label: 'Submit Project', path: '/submit', icon: Plus },
  { id: 'privacy', label: 'Privacy Policy', path: '/privacy', icon: Shield },
  { id: 'terms', label: 'Terms of Service', path: '/terms', icon: FileText },
]

export function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()

  const navItems = commands.filter(
    (c) => c.label.toLowerCase().includes(query.toLowerCase())
  )

  const projects = query.trim()
    ? mockWebsites
        .filter(
          (w) =>
            w.title.toLowerCase().includes(query.toLowerCase()) ||
            w.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
        .map((w) => ({ ...w, type: 'project', path: `/website/${w.id}` }))
    : []

  const allItems = [
    ...navItems.map((c) => ({ ...c, type: 'nav' })),
    ...projects,
  ]

  const select = useCallback(() => {
    const item = allItems[selected]
    if (item) {
      navigate(item.path)
      onClose()
      setQuery('')
      setSelected(0)
    }
  }, [allItems, selected, navigate, onClose])

  useEffect(() => {
    setSelected(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => (s < allItems.length - 1 ? s + 1 : 0))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => (s > 0 ? s - 1 : allItems.length - 1))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        select()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, allItems.length, select, onClose])

  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <Search className="h-5 w-5 text-gray-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or navigate..."
              autoFocus
              className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 outline-none py-2"
            />
            <kbd className="hidden sm:inline rounded bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-500">
              ESC
            </kbd>
          </div>
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {allItems.length === 0 ? (
              <p className="px-4 py-8 text-center text-gray-500">No results found.</p>
            ) : (
              allItems.map((item, i) => {
                const Icon = item.icon || Search
                const handleClick = () => {
                  navigate(item.path)
                  onClose()
                  setQuery('')
                  setSelected(0)
                }
                return (
                  <button
                    key={item.id || item.path}
                    onClick={handleClick}
                    onMouseEnter={() => setSelected(i)}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                      i === selected
                        ? 'bg-accent-500/10 text-accent-600 dark:text-accent-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="font-medium">{item.label || item.title}</span>
                    {item.type === 'project' && (
                      <span className="ml-auto text-xs text-gray-500">{item.category}</span>
                    )}
                  </button>
                )
              })
            )}
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center gap-4 text-xs text-gray-500">
            <span><kbd className="rounded bg-gray-100 dark:bg-gray-800 px-1.5">↑↓</kbd> Navigate</span>
            <span><kbd className="rounded bg-gray-100 dark:bg-gray-800 px-1.5">↵</kbd> Select</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
