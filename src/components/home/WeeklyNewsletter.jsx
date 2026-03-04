import { motion } from 'framer-motion'
import { Mail, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const points = [
  'Newly launched Web3 apps & websites',
  'Hidden gems in Web3',
  'Useful tools for blockchain builders',
  'Hand-picked articles and beginner-friendly videos',
  'Grants and incentive programs',
]

export function WeeklyNewsletter() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      className="overflow-hidden rounded-[1.5rem] border-2 border-accent-500/20 bg-gradient-to-br from-accent-500/10 via-accent-900/20 to-cyan-500/10 p-8 sm:p-10 lg:p-12 dark:from-accent-900/20 dark:via-gray-900/50 dark:to-cyan-900/20"
    >
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="font-display text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Every week, you get:
          </h2>
          <ul className="mt-6 space-y-4">
            {points.map((point, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500/20">
                  <Check className="h-3.5 w-3.5 text-accent-500" />
                </span>
                <span className="font-medium">{point}</span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-8 text-xl font-bold text-gray-900 dark:text-white">
            Straight to your inbox.
          </p>
        </div>
        <Link
          to="/#newsletter"
          className="group flex shrink-0 items-center gap-3 rounded-2xl border-2 border-accent-500 bg-accent-500 px-8 py-4 font-bold text-white shadow-glow transition-all hover:border-accent-400 hover:bg-accent-400 hover:shadow-glow-lg"
        >
          <Mail className="h-6 w-6 transition-transform group-hover:scale-110" />
          Subscribe to newsletter
        </Link>
      </div>
    </motion.section>
  )
}
