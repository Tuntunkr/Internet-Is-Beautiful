import { useState, useEffect, useCallback } from 'react'

const CACHE_KEY = 'iib_visit_count'
const CACHE_TTL = 60000 // 1 min

export function useAnalytics() {
  const [visitCount, setVisitCount] = useState(null)

  const trackVisit = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics/visit', { method: 'POST' })
      if (res.ok) {
        const { count } = await res.json()
        setVisitCount(count)
        return count
      }
    } catch {
      // Fallback: use cached or null
    }
    return null
  }, [])

  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics/visits')
      if (res.ok) {
        const { count } = await res.json()
        setVisitCount(count)
        return count
      }
    } catch {
      // Ignore
    }
    return null
  }, [])

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      const { count, ts } = JSON.parse(cached)
      if (Date.now() - ts < CACHE_TTL) {
        setVisitCount(count)
        return
      }
    }
    trackVisit().then((count) => {
      if (count !== null) {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ count, ts: Date.now() }))
      }
    })
  }, [trackVisit])

  return { visitCount, fetchCount }
}
