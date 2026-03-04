import { useState, useEffect } from 'react'
import { mockWebsites } from '../data/mockWebsites'

export function useWebsites(params = {}) {
  const [websites, setWebsites] = useState(mockWebsites)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const qs = new URLSearchParams(params).toString()
    fetch(`/api/websites?${qs}`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => setWebsites(data.map((w) => ({ ...w, id: w.id || w._id }))))
      .catch(() => setWebsites(mockWebsites))
      .finally(() => setLoading(false))
  }, [params?.tag, params?.category, params?.trending, params?.limit])

  return { websites, loading }
}
