import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function Donate() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl text-center"
    >
      <div className="rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 p-8 sm:p-12">
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 dark:bg-accent-900/30">
            <Heart className="h-8 w-8 text-accent-500" />
          </div>
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-gray-900 dark:text-white">
          Support Internet Is Beautiful
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Your donation helps us curate the best resources and keep the platform running. Every contribution matters.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a href="#">
            <Button variant="primary" className="gap-2">
              <Heart className="h-4 w-4" />
              Donate
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  )
}
