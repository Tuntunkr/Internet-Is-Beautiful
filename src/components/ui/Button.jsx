import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-accent-500 hover:bg-accent-600 text-white border-transparent shadow-lg shadow-accent-500/25',
  secondary: 'bg-transparent border-2 border-accent-500 text-accent-600 dark:text-accent-400 hover:bg-accent-500/10',
  ghost: 'bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800',
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
