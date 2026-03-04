import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'internetisbeautiful-pending-submissions'

const Context = createContext(null)

export function LocalSubmissionsProvider({ children }) {
  const [submissions, setSubmissions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions))
  }, [submissions])

  const addSubmission = useCallback((data) => {
    const submission = {
      id: `local-${Date.now()}`,
      ...data,
      status: 'pending',
      isLocal: true,
      createdAt: new Date().toISOString(),
    }
    setSubmissions((prev) => [submission, ...prev])
    return submission
  }, [])

  const removeSubmission = useCallback((id) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const toWebsiteFormat = (s) => ({
    id: s.id,
    title: s.title,
    category: s.category,
    description: s.description,
    url: s.url,
    image: s.image || 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=400&h=240&fit=crop',
    tags: Array.isArray(s.tags) ? s.tags : [],
    twitter: s.twitter || '#',
    github: s.github || '#',
    engagement: 0,
    featured: false,
    trending: false,
    isLocal: true,
  })

  return (
    <Context.Provider value={{ submissions, addSubmission, removeSubmission, toWebsiteFormat }}>
      {children}
    </Context.Provider>
  )
}

export function useLocalSubmissions() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useLocalSubmissions must be used within LocalSubmissionsProvider')
  return ctx
}
