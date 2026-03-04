import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center"
    >
      <p className="text-6xl font-bold text-accent-500">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-gray-900 dark:text-white">
        Page not found
      </h1>
      <p className="mt-2 max-w-sm text-gray-600 dark:text-gray-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/">
          <Button variant="primary" className="gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link to="/projects">
          <Button variant="secondary" className="gap-2">
            <Search className="h-4 w-4" />
            Browse Projects
          </Button>
        </Link>
      </div>
    </motion.div>
  )
}
