import { createContext, useContext, useState, useEffect } from 'react'

const Context = createContext(null)

export function CommandPaletteProvider({ children }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Context.Provider value={{ open, setOpen }}>
      {children}
    </Context.Provider>
  )
}

export function useCommandPalette() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error('useCommandPalette must be used within CommandPaletteProvider')
  return ctx
}
