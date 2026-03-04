import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { BookmarkProvider } from './context/BookmarkContext'
import { LocalSubmissionsProvider } from './context/LocalSubmissionsContext'
import { ToastProvider } from './context/ToastContext'
import { CommandPaletteProvider } from './context/CommandPaletteContext'
import { Layout } from './components/layout/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { WebsiteDetail } from './pages/WebsiteDetail'
import { Submit } from './pages/Submit'
import { Donate } from './pages/Donate'
import { Dashboard } from './pages/Dashboard'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { TrackSubmission } from './pages/TrackSubmission'
import { Admin } from './pages/Admin'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
<BookmarkProvider>
      <LocalSubmissionsProvider>
      <ToastProvider>
            <CommandPaletteProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="website/:id" element={<WebsiteDetail />} />
                    <Route path="submit" element={<Submit />} />
                    <Route path="donate" element={<Donate />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="privacy" element={<Privacy />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="track/:token" element={<TrackSubmission />} />
                    <Route path="admin" element={<Admin />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </CommandPaletteProvider>
          </ToastProvider>
      </LocalSubmissionsProvider>
        </BookmarkProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
