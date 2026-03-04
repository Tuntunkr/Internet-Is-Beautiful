import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      setProgress(height > 0 ? (winScroll / height) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-accent-500 z-[60] origin-left"
      style={{ scaleX: progress / 100 }}
    />
  )
}
