import { motion } from 'framer-motion'

export function Skeleton({ className = '', ...props }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`rounded-lg bg-gray-200 dark:bg-gray-700 ${className}`}
      {...props}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#0a0f1a] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-4 p-6">
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-5/6 rounded-lg" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-7 w-20 rounded-lg" />
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-gray-200/80 pt-4 dark:border-white/10">
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="h-9 w-9 rounded-xl" />
          <Skeleton className="ml-auto h-9 w-24 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
