import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Sun, Moon, Plus } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useCommandPalette } from '../../context/CommandPaletteContext'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/donate', label: 'Donate' },
]

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const { setOpen: openCommandPalette } = useCommandPalette()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/60 dark:border-white/5 bg-white/90 dark:bg-[#0a0f1a]/95 backdrop-blur-xl shadow-sm dark:shadow-none">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo size="md" textClassName="text-lg sm:text-xl" />

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === to
                  ? 'text-accent-600 dark:text-accent-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              {label}
              {location.pathname === to && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Search"
            onClick={() => openCommandPalette(true)}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            <Search className="h-5 w-5" />
            <kbd className="hidden sm:inline rounded-md border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-2 py-0.5 font-mono text-xs text-gray-500 dark:text-gray-400">
              ⌘K
            </kbd>
          </button>
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="rounded-xl p-2.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <Link to="/submit">
            <Button variant="primary" className="gap-2 rounded-xl shadow-glow">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add New Project</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
