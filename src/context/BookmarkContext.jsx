import { createContext, useContext, useCallback, useState, useEffect } from 'react'

const BookmarkContext = createContext(null)
const STORAGE_KEY = 'internetisbeautiful-bookmarks'

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = useCallback((item) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.id === item.id)) return prev
      return [...prev, { ...item, bookmarkedAt: Date.now() }]
    })
  }, [])

  const removeBookmark = useCallback((id) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
  }, [])

  const toggleBookmark = useCallback((item) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id)
      if (exists) return prev.filter((b) => b.id !== item.id)
      return [...prev, { ...item, bookmarkedAt: Date.now() }]
    })
  }, [])

  const isBookmarked = useCallback(
    (id) => bookmarks.some((b) => b.id === id),
    [bookmarks]
  )

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  const ctx = useContext(BookmarkContext)
  if (!ctx) throw new Error('useBookmarks must be used within BookmarkProvider')
  return ctx
}
