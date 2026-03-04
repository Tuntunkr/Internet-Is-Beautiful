import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { ReadingProgress } from '../ReadingProgress'
import { CommandPalette } from '../CommandPalette'
import { AnalyticsScript } from '../AnalyticsScript'
import { useCommandPalette } from '../../context/CommandPaletteContext'

export function Layout() {
  const location = useLocation()
  const { open, setOpen } = useCommandPalette()
  const showProgress = location.pathname.startsWith('/website/')

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <AnalyticsScript />
      <CommandPalette open={open} onClose={() => setOpen(false)} />
      {showProgress && <ReadingProgress />}
      <Header />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
